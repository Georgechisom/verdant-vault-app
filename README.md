# Verdant Vault

## Elevator Pitch
A Hedera-powered marketplace connecting investors with African farmers to fund agricultural expansion in exchange for tokenized carbon credits representing verified CO2 sequestration.

---

## Problem Statement
- **Farmers**: Lack capital to expand operations, excluded from lucrative carbon markets
- **Investors/Corporates**: Need verifiable carbon offsets for ESG compliance, want impact investments
- **Current Gap**: No accessible platform linking small-scale agriculture to carbon credit buyers

---

## Solution
Two-sided marketplace where:
1. Farmers post funding needs (seeds, irrigation, land expansion)
2. Investors fund campaigns and receive carbon credit tokens (HTS)
3. Smart contracts release funds based on proof of farming activity
4. Credits are tradeable or burnable for offset claims

---

## Core User Flows

### Farmer Journey
1. Register → Submit farm details (location, size, crop type, funding need)
2. Upload verification docs (land ownership, existing farm photos) → Admin reviews
3. Campaign goes live → Receives investments
4. Submit milestone proof (planting photos, growth updates)
5. Get funds disbursed → Continue farming
6. Platform calculates carbon credits generated → Distributed to investors

### Investor Journey
1. Connect Hedera wallet (HashPack/Blade)
2. Browse farmer campaigns (location, crop, funding goal, carbon potential)
3. Invest HBAR → Get receipt + estimated carbon credits
4. Track farm progress (milestone updates, photos)
5. Receive carbon credit tokens (HTS) when harvest verified
6. Trade credits OR burn for offset certificate

---

## Smart Contract Architecture

### Main Contract: `VerdantVault.sol`

```solidity
struct FarmCampaign {
    address farmer;
    string ipfsMetadata; // farm details, photos
    uint256 fundingGoal;
    uint256 raisedAmount;
    uint256 deadline;
    uint256 estimatedCO2Tons; // calculated from crop type + acreage
    CampaignStatus status; // Active, Funded, Completed, Failed
    Milestone[] milestones;
}

struct Milestone {
    string description; // "Land preparation", "Planting", "Harvest"
    uint8 fundPercentage; // % of total to release
    string proofIpfsHash;
    bool completed;
}

struct Investment {
    address investor;
    uint256 amount;
    uint256 creditsClaimed; // carbon credits received
}

// Core functions
function createCampaign(string memory ipfsHash, uint256 goal, uint256 estimatedCO2) external
function invest(uint256 campaignId) external payable
function submitMilestoneProof(uint256 campaignId, uint256 milestoneIndex, string memory ipfsHash) external
function releaseFunds(uint256 campaignId, uint256 milestoneIndex) external // Admin/automated
function mintCarbonCredits(uint256 campaignId) external // After harvest verification
function claimRefund(uint256 campaignId) external
```

### Carbon Credit Token (HTS)
```solidity
// Hedera Token Service integration
HTS Token: "VerdantCarbon" (symbol: VCC)
- Fungible token
- 1 VCC = 1 ton CO2 sequestered
- Minted to investors proportional to investment amount
- Burnable for offset certificates
```

---

## Frontend Pages (MVP)

### 1. **Home/Browse Campaigns**
**Elements:**
- Filter: Crop type (maize, rice, cassava), Location (Nigeria, Kenya, etc.), Funding status
- Campaign cards:
  - Farmer name + location
  - Crop + farm size (hectares)
  - Funding: $X raised / $Y goal (progress bar)
  - Estimated carbon credits: Z tons CO2
  - "Invest Now" button

### 2. **Campaign Detail Page**
**Elements:**
- Hero: Farm photos, location map
- About: Farmer story, what funding will be used for
- Impact metrics: Hectares to expand, jobs created, CO2 tons
- Milestone timeline: 
  - Land prep (25% funds) ✓
  - Planting (25% funds) → In Progress
  - Growth (25% funds)
  - Harvest (25% funds)
- Investment widget:
  - Input HBAR amount
  - Shows: "You'll receive ~X VCC tokens"
  - Connect wallet → Confirm transaction
- Recent investors list (anonymized option)

### 3. **Create Campaign (Farmer)**
**Form Fields:**
- Farm name, location (dropdown), farm size (hectares)
- Crop type (dropdown: maize, rice, beans, etc.)
- Funding goal (HBAR), campaign duration (days)
- Upload: Land documents, current farm photos
- Milestones (pre-defined template):
  - Land preparation (25%)
  - Planting (25%)
  - Mid-growth monitoring (25%)
  - Harvest (25%)
- Auto-calculate estimated CO2 based on crop + hectares
- Submit for admin review

### 4. **Farmer Dashboard**
**Sections:**
- My campaign stats: Raised amount, investor count, days left
- Milestone tracker: Upload proof button (opens modal)
- Notifications: "Milestone approved - funds released!"
- Wallet balance (HBAR)

### 5. **Investor Dashboard**
**Sections:**
- Portfolio: Total invested, campaigns supported, carbon credits earned
- My Investments table:
  - Campaign | Amount | Status | Credits Earned | Actions (View/Trade)
- Carbon Credits wallet: Total VCC balance, "Burn for Certificate" button
- Impact summary: Total CO2 offset, farms supported

### 6. **Admin Panel** (Simple)
- Pending campaigns (Approve/Reject with notes)
- Milestone proof review (Image viewer + Approve/Reject)
- Platform stats: Total campaigns, HBAR raised, credits issued

---

## Technical Stack

**Blockchain:**
- Hedera Hashgraph (Testnet for hackathon)
- Smart Contract Service (Solidity 0.8.x)
- Hedera Token Service (HTS) for carbon credits

**Frontend:**
- Next 
- TailwindCSS
- Hedera SDK (@hashgraph/sdk)
- Wallet: HashPack or Blade

**Storage:**
- IPFS (Pinata/NFT.Storage) for campaign metadata, photos, proof docs


---

## Carbon Credit Calculation

**Formula (Simplified for MVP):**
```
CO2 Sequestration = Farm Area (hectares) × Crop Factor × Growth Period

Crop Factors (tons CO2/hectare/year):
- Maize: 10 tons
- Rice: 8 tons  
- Cassava: 6 tons
- Beans: 5 tons

Example: 
2 hectares of maize for 6 months
= 2 × 10 × 0.5 = 10 tons CO2
= 10 VCC tokens minted
```

**Distribution:**
Credits split proportionally among investors based on contribution percentage.

---

## MVP Feature Scope

### Must Have
- [ ] Deploy smart contract to Hedera Testnet
- [ ] HTS carbon credit token creation
- [ ] Farmer creates 1 campaign (pre-fill form for demo)
- [ ] Investor invests HBAR
- [ ] Milestone proof upload (1 milestone)
- [ ] Fund release after milestone approval
- [ ] Carbon credits minted and distributed
- [ ] Investor sees VCC balance in dashboard
- [ ] Wallet connection
- [ ] Mobile-responsive UI

---

## Revenue & Sustainability

- Primary revenue: platform fee on investments
  - Rate: 3% per investment transaction
  - Paid by: investors (deducted automatically)
  - Flow: 100 HBAR investment → 3 HBAR to treasury, 97 HBAR to campaign
  - Justification: industry standard (GoFundMe: 2.9%, Kickstarter: 5%)
- Treasury wallet: multi-sig controlled by core team (3-of-5 consensus)
- Fee usage allocation:
  - 40% Platform development & maintenance
  - 30% Marketing & farmer onboarding
  - 20% Carbon credit verification partnerships
  - 10% Emergency fund
- Optional revenue (Phase 2):
  - Premium farmer listings: 100 HBAR for featured placement
  - Carbon credit trading fee: 1% per secondary market trade
  - Corporate API access: $500/month subscription
- Pricing currency: HBAR (native token)
  - UI displays USD equivalent for reference
  - Avoids oracle complexity for MVP
  - Investors pay gas + platform fee in HBAR

---

## Demo Flow Script

**Setup:** 3 pre-loaded farmer campaigns (1 funded, 1 active, 1 new)

1. **Browse**: Show homepage with 3 campaigns, filtering
2. **Invest**: Connect wallet → Invest 10 HBAR in active campaign → Transaction success toast
3. **Farmer submits proof**: Switch to farmer dashboard → Upload harvest photo to IPFS
4. **Admin approves**: Admin panel → View proof → Click approve → Triggers fund release
5. **Credits issued**: Smart contract mints 5 VCC tokens → Investor dashboard shows balance
6. **Impact**: Show total platform metrics (30 HBAR raised, 15 tons CO2 offset)

---

## Smart Contract Functions (Detailed)

```solidity
// Campaign management
function createCampaign(
    string memory ipfsMetadata,
    uint256 fundingGoal,
    uint256 duration,
    uint256 estimatedCO2
) external returns (uint256 campaignId)

function invest(uint256 campaignId) external payable

// Milestone handling
function submitProof(
    uint256 campaignId, 
    uint256 milestoneIndex, 
    string memory ipfsHash
) external // Only farmer

function approveMilestone(
    uint256 campaignId,
    uint256 milestoneIndex
) external // Only admin → releases funds

// Carbon credits
function mintCredits(uint256 campaignId) external {
    // After final milestone approved
    uint256 totalCredits = campaigns[campaignId].estimatedCO2Tons;
    Investment[] memory invs = campaignInvestments[campaignId];
    
    for (uint i = 0; i < invs.length; i++) {
        uint256 share = (invs[i].amount * totalCredits) / campaign.raisedAmount;
        carbonToken.mint(invs[i].investor, share);
    }
}

```

---

## Possible Roadmap

### 1. **Farmer Verification Badge**
- Green checkmark for admin-approved farmers
- Builds trust, shows "Verified Farmer" tag

### 2. **Impact Counter (Homepage)**
- Real-time stats: "X tons CO2 offset • Y farmers funded • Z HBAR deployed"
- Animated counter for engagement

### 3. **Certificate Generator**
- When investor burns VCC, auto-generate PDF certificate
- "John Doe offset 5 tons CO2 via Verdant Vault on [date]"
- IPFS link + transaction hash for verification

---

## Why This is Viable

✅ **Africa-focused**: Addresses real farmer financing gap  
✅ **Hedera fit**: Uses HTS for credits, testnet ready  
✅ **Clear utility**: Investors get tradeable assets  
✅ **Scalable**: Farming → Solar → Reforestation later  
✅ **Measurable impact**: Tons CO2 is concrete metric  
✅ **Simple MVP**: Core flow works without over-engineering  

