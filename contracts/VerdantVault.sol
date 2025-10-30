// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IHederaTokenService {
    function mintToken(
        address token,
        uint64 amount,
        bytes[] memory metadata
    )
        external
        returns (
            int responseCode,
            uint64 newTotalSupply,
            int64[] memory serialNumbers
        );

    function associateToken(
        address account,
        address token
    ) external returns (int responseCode);

    function transferToken(
        address token,
        address sender,
        address receiver,
        int64 amount
    ) external returns (int responseCode);
}

contract VerdantVault {
    struct FarmCampaign {
        address payable farmer;
        string ipfsMetadata;
        uint256 fundingGoal;
        uint256 raisedAmount;
        uint256 deadline;
        uint256 estimatedCO2Tons;
        CampaignStatus status;
        Milestone[] milestones;
        Investment[] investments;
    }

    struct Milestone {
        string description;
        uint8 fundPercentage;
        string proofIpfsHash;
        bool completed;
        bool approved;
    }

    struct Investment {
        address investor;
        uint256 amount;
        uint256 creditsEarned;
        bool creditsClaimed;
    }

    enum CampaignStatus {
        Active,
        Funded,
        Completed,
        Failed,
        Canceled
    }

    address public admin;
    address public carbonCreditToken;
    IHederaTokenService public hts =
        IHederaTokenService(0x0000000000000000000000000000000000000167);

    uint256 public campaignCounter;
    mapping(uint256 => FarmCampaign) public campaigns;

    event CampaignCreated(
        uint256 campaignId,
        address indexed farmer,
        uint256 fundingGoal,
        uint256 deadline
    );
    event InvestmentMade(
        uint256 indexed campaignId,
        address indexed investor,
        uint256 amount
    );
    event MilestoneProofSubmitted(
        uint256 indexed campaignId,
        uint256 milestoneIndex,
        string ipfsHash
    );
    event MilestoneApproved(uint256 indexed campaignId, uint256 milestoneIndex);
    event FundsReleased(uint256 indexed campaignId, uint256 amount);
    event CarbonCreditsMinted(uint256 indexed campaignId, uint256 totalAmount);
    event CarbonCreditsClaimed(
        uint256 indexed campaignId,
        address indexed investor,
        uint256 amount
    );

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyFarmer(uint256 _campaignId) {
        require(msg.sender == campaigns[_campaignId].farmer, "Only farmer");
        _;
    }

    constructor(address _carbonCreditToken) {
        admin = msg.sender;
        carbonCreditToken = _carbonCreditToken;
    }

    function createCampaign(
        string memory _ipfsMetadata,
        uint256 _fundingGoal,
        uint256 _durationDays,
        uint256 _estimatedCO2
    ) external {
        uint256 deadline = block.timestamp + _durationDays * 1 days;
        campaignCounter++;

        FarmCampaign storage newCampaign = campaigns[campaignCounter];
        newCampaign.farmer = payable(msg.sender);
        newCampaign.ipfsMetadata = _ipfsMetadata;
        newCampaign.fundingGoal = _fundingGoal;
        newCampaign.raisedAmount = 0;
        newCampaign.deadline = deadline;
        newCampaign.estimatedCO2Tons = _estimatedCO2;
        newCampaign.status = CampaignStatus.Active;

        newCampaign.milestones.push(
            Milestone("Land preparation", 25, "", false, false)
        );
        newCampaign.milestones.push(
            Milestone("Planting", 25, "", false, false)
        );
        newCampaign.milestones.push(
            Milestone("Mid-growth monitoring", 25, "", false, false)
        );
        newCampaign.milestones.push(Milestone("Harvest", 25, "", false, false));

        emit CampaignCreated(
            campaignCounter,
            msg.sender,
            _fundingGoal,
            deadline
        );
    }

    function invest(uint256 _campaignId) external payable {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(
            campaign.status == CampaignStatus.Active,
            "Campaign not active"
        );
        require(block.timestamp < campaign.deadline, "Campaign ended");
        require(msg.value > 0, "Amount must be > 0");

        campaign.raisedAmount += msg.value;
        campaign.investments.push(Investment(msg.sender, msg.value, 0, false));

        if (campaign.raisedAmount >= campaign.fundingGoal) {
            campaign.status = CampaignStatus.Funded;
        }

        emit InvestmentMade(_campaignId, msg.sender, msg.value);
    }

    function submitMilestoneProof(
        uint256 _campaignId,
        uint256 _milestoneIndex,
        string memory _ipfsHash
    ) external onlyFarmer(_campaignId) {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(
            campaign.status == CampaignStatus.Funded,
            "Campaign not funded"
        );
        require(
            _milestoneIndex < campaign.milestones.length,
            "Invalid milestone"
        );

        campaign.milestones[_milestoneIndex].proofIpfsHash = _ipfsHash;
        campaign.milestones[_milestoneIndex].completed = true;

        emit MilestoneProofSubmitted(_campaignId, _milestoneIndex, _ipfsHash);
    }

    function approveMilestone(
        uint256 _campaignId,
        uint256 _milestoneIndex
    ) external onlyAdmin {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(
            campaign.status == CampaignStatus.Funded,
            "Campaign not funded"
        );
        require(
            _milestoneIndex < campaign.milestones.length,
            "Invalid milestone"
        );
        require(
            campaign.milestones[_milestoneIndex].completed,
            "Proof not submitted"
        );
        require(
            !campaign.milestones[_milestoneIndex].approved,
            "Already approved"
        );

        campaign.milestones[_milestoneIndex].approved = true;
        emit MilestoneApproved(_campaignId, _milestoneIndex);

        uint256 amountToRelease = (campaign.fundingGoal *
            campaign.milestones[_milestoneIndex].fundPercentage) / 100;
        campaign.farmer.transfer(amountToRelease);
        emit FundsReleased(_campaignId, amountToRelease);

        bool allApproved = true;
        for (uint i = 0; i < campaign.milestones.length; i++) {
            if (!campaign.milestones[i].approved) {
                allApproved = false;
                break;
            }
        }

        if (allApproved) {
            campaign.status = CampaignStatus.Completed;
            _mintCarbonCredits(_campaignId);
        }
    }

    function _mintCarbonCredits(uint256 _campaignId) private {
        FarmCampaign storage campaign = campaigns[_campaignId];

        uint256 totalCredits = 0;
        for (uint i = 0; i < campaign.investments.length; i++) {
            uint256 share = (campaign.investments[i].amount *
                campaign.estimatedCO2Tons) / campaign.raisedAmount;
            campaign.investments[i].creditsEarned = share;
            totalCredits += share;
        }

        bytes[] memory metadata = new bytes[](0);
        (int responseCode, , ) = hts.mintToken(
            carbonCreditToken,
            uint64(totalCredits),
            metadata
        );
        require(responseCode == 22, "HTS mint failed");

        emit CarbonCreditsMinted(_campaignId, totalCredits);
    }

    function claimCarbonCredits(uint256 _campaignId) external {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(
            campaign.status == CampaignStatus.Completed,
            "Campaign not completed"
        );

        uint256 creditAmount = 0;
        uint256 investmentIndex = type(uint256).max;

        for (uint i = 0; i < campaign.investments.length; i++) {
            if (campaign.investments[i].investor == msg.sender) {
                require(
                    !campaign.investments[i].creditsClaimed,
                    "Credits already claimed"
                );
                creditAmount = campaign.investments[i].creditsEarned;
                investmentIndex = i;
                break;
            }
        }

        require(creditAmount > 0, "No credits to claim");
        require(investmentIndex != type(uint256).max, "Investment not found");

        campaign.investments[investmentIndex].creditsClaimed = true;

        int responseCode = hts.transferToken(
            carbonCreditToken,
            address(this),
            msg.sender,
            int64(uint64(creditAmount))
        );
        require(responseCode == 22, "HTS transfer failed");

        emit CarbonCreditsClaimed(_campaignId, msg.sender, creditAmount);
    }

    function getClaimableCredits(
        uint256 _campaignId,
        address _investor
    ) external view returns (uint256 amount, bool claimed) {
        FarmCampaign storage campaign = campaigns[_campaignId];

        for (uint i = 0; i < campaign.investments.length; i++) {
            if (campaign.investments[i].investor == _investor) {
                return (
                    campaign.investments[i].creditsEarned,
                    campaign.investments[i].creditsClaimed
                );
            }
        }

        return (0, false);
    }

    function claimRefund(uint256 _campaignId) external {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(
            block.timestamp >= campaign.deadline &&
                campaign.raisedAmount < campaign.fundingGoal,
            "Campaign not failed"
        );

        uint256 refundAmount = 0;
        for (uint i = 0; i < campaign.investments.length; i++) {
            if (campaign.investments[i].investor == msg.sender) {
                refundAmount = campaign.investments[i].amount;
                campaign.investments[i].amount = 0;
                break;
            }
        }

        require(refundAmount > 0, "No investment found");
        payable(msg.sender).transfer(refundAmount);

        if (campaign.status != CampaignStatus.Failed) {
            campaign.status = CampaignStatus.Failed;
        }
    }

    function getMilestones(
        uint256 _campaignId
    ) external view returns (Milestone[] memory) {
        return campaigns[_campaignId].milestones;
    }

    function getInvestments(
        uint256 _campaignId
    ) external view returns (Investment[] memory) {
        return campaigns[_campaignId].investments;
    }

    function getMilestoneCount(
        uint256 _campaignId
    ) external view returns (uint256) {
        return campaigns[_campaignId].milestones.length;
    }

    function getInvestmentCount(
        uint256 _campaignId
    ) external view returns (uint256) {
        return campaigns[_campaignId].investments.length;
    }
}
