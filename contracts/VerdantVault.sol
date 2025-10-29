// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VerdantVault {
    struct FarmCampaign {
        address payable farmer;
        string ipfsMetadata; // farm details, photos
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
        uint8 fundPercentage; // % of total to release
        string proofIpfsHash;
        bool completed;
        bool approved;
    }

    struct Investment {
        address investor;
        uint256 amount;
        uint256 creditsClaimed; // carbon credits received
    }

    enum CampaignStatus { Active, Funded, Completed, Failed, Canceled }

    address public admin;
    uint256 public campaignCounter;
    mapping(uint256 => FarmCampaign) public campaigns;

    event CampaignCreated(uint256 campaignId, address indexed farmer, uint256 fundingGoal, uint256 deadline);
    event InvestmentMade(uint256 indexed campaignId, address indexed investor, uint256 amount);
    event MilestoneProofSubmitted(uint256 indexed campaignId, uint256 milestoneIndex, string ipfsHash);
    event MilestoneApproved(uint256 indexed campaignId, uint256 milestoneIndex);
    event FundsReleased(uint256 indexed campaignId, uint256 amount);
    event CarbonCreditsMinted(uint256 indexed campaignId, address indexed investor, uint256 amount);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyFarmer(uint256 _campaignId) {
        require(msg.sender == campaigns[_campaignId].farmer, "Only the farmer of this campaign can perform this action");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function createCampaign(string memory _ipfsMetadata, uint256 _fundingGoal, uint256 _durationDays, uint256 _estimatedCO2) external {
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

        // Pre-defined milestones for MVP
        newCampaign.milestones.push(Milestone("Land preparation", 25, "", false, false));
        newCampaign.milestones.push(Milestone("Planting", 25, "", false, false));
        newCampaign.milestones.push(Milestone("Mid-growth monitoring", 25, "", false, false));
        newCampaign.milestones.push(Milestone("Harvest", 25, "", false, false));

        emit CampaignCreated(campaignCounter, msg.sender, _fundingGoal, deadline);
    }

    function invest(uint256 _campaignId) external payable {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(campaign.status == CampaignStatus.Active, "Campaign is not active");
        require(block.timestamp < campaign.deadline, "Campaign has ended");
        require(msg.value > 0, "Investment must be greater than 0");

        campaign.raisedAmount += msg.value;
        campaign.investments.push(Investment(msg.sender, msg.value, 0));

        if (campaign.raisedAmount >= campaign.fundingGoal) {
            campaign.status = CampaignStatus.Funded;
        }

        emit InvestmentMade(_campaignId, msg.sender, msg.value);
    }

    function submitMilestoneProof(uint256 _campaignId, uint256 _milestoneIndex, string memory _ipfsHash) external onlyFarmer(_campaignId) {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(campaign.status == CampaignStatus.Funded, "Campaign is not funded");
        require(_milestoneIndex < campaign.milestones.length, "Invalid milestone index");
        
        campaign.milestones[_milestoneIndex].proofIpfsHash = _ipfsHash;
        emit MilestoneProofSubmitted(_campaignId, _milestoneIndex, _ipfsHash);
    }

    function approveMilestone(uint256 _campaignId, uint256 _milestoneIndex) external onlyAdmin {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(campaign.status == CampaignStatus.Funded, "Campaign is not funded");
        require(_milestoneIndex < campaign.milestones.length, "Invalid milestone index");
        require(!campaign.milestones[_milestoneIndex].approved, "Milestone already approved");

        campaign.milestones[_milestoneIndex].approved = true;
        emit MilestoneApproved(_campaignId, _milestoneIndex);

        uint256 amountToRelease = (campaign.fundingGoal * campaign.milestones[_milestoneIndex].fundPercentage) / 100;
        campaign.farmer.transfer(amountToRelease);
        emit FundsReleased(_campaignId, amountToRelease);

        // If this is the last milestone, complete the campaign
        bool allMilestonesApproved = true;
        for (uint i = 0; i < campaign.milestones.length; i++) {
            if (!campaign.milestones[i].approved) {
                allMilestonesApproved = false;
                break;
            }
        }

        if (allMilestonesApproved) {
            campaign.status = CampaignStatus.Completed;
            // In a real scenario, this would trigger the carbon credit minting process
        }
    }

    // Placeholder for HTS integration
    function mintCarbonCredits(uint256 _campaignId) external onlyAdmin {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(campaign.status == CampaignStatus.Completed, "Campaign must be completed");

        for (uint i = 0; i < campaign.investments.length; i++) {
            uint256 share = (campaign.investments[i].amount * campaign.estimatedCO2Tons) / campaign.raisedAmount;
            // This is where you would call the HTS precompile to mint tokens
            // For now, we just emit an event
            emit CarbonCreditsMinted(_campaignId, campaign.investments[i].investor, share);
        }
    }

    function claimRefund(uint256 _campaignId) external {
        FarmCampaign storage campaign = campaigns[_campaignId];
        require(block.timestamp >= campaign.deadline && campaign.raisedAmount < campaign.fundingGoal, "Campaign did not fail");

        uint256 investmentAmount = 0;
        for (uint i = 0; i < campaign.investments.length; i++) {
            if (campaign.investments[i].investor == msg.sender) {
                investmentAmount = campaign.investments[i].amount;
                break;
            }
        }

        require(investmentAmount > 0, "No investment found for this address");
        payable(msg.sender).transfer(investmentAmount);
    }
}
