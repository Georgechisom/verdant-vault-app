# Verdant Vault: Decentralized Climate Finance Platform MVP

## 1. Product Overview
**Product Name**: Verdant Vault  
**Tagline**: Unlock Earth's Wealth for African Roots  
**Version**: MVP 1.0 (Hedera Africa Hackathon 2025 Edition)  
**Description**: Verdant Vault is a decentralized climate finance (DeCFi) platform built on Hedera Hashgraph, designed to empower over 1 million African farmers and grassroots green projects by tokenizing their carbon impact into secure NFTs. Using Hedera Token Service (HTS) for NFT creation, it enables transparent minting, trading, and retirement of carbon credits tied to real-world sustainability efforts (e.g., regenerative agriculture, soil carbon sequestration). This bridges "from soil to global markets," making climate finance inclusive at the base level—farmers mint NFTs representing verified carbon offsets, which serve as incentives for investors seeking ESG-aligned returns.  

Inspired by KlimaDAO's RWA tokenization, Regen Registry's verification protocols, and UN SDG 13 (Climate Action), the platform aligns with the hackathon's DLT for Operations track by enhancing transparency and efficiency in agricultural supply chains. For the MVP, we use HTS NFTs (NonFungibleUnique type) to represent unique farm impacts (e.g., serialized with metadata like tons CO2, GPS proofs), with mock verification based on Regen methodologies. Hedera Guardian—Hedera's framework for regenerative finance and carbon compliance—will be integrated post-hackathon for production-scale emissions tracking, Verra-aligned audits, and enterprise features, as full integration requires more time than the 48-hour event allows.  

The MVP focuses on a core loop: farmers submit projects, mint NFTs, trade with investors, and retire for impact certification, all on Hedera's carbon-negative network for low fees and high scalability.  

**Vision**: Scale to 1M+ African farmers by 2027, tokenizing $1B+ in carbon assets, fostering poverty alleviation (SDG 1), sustainable agriculture (SDG 2), and global climate resilience (SDG 13).  

**Date**: October 25, 2025 (Hackathon Submission)

## 2. Business Objectives
- **Primary Goal**: Build and demo a working MVP that tokenizes 100+ mock carbon NFTs for African farm projects, enabling minting, trading, and retirement, while showcasing inclusivity and investor incentives.
- **Secondary Goals**:
  - Achieve <3-second transaction finality and sub-$0.01 fees to demonstrate accessibility for low-resource users.
  - Mock Guardian-compliant verification for credibility, with a clear roadmap to full integration.
  - Align with hackathon judging: Innovation in eco-friendly DeFi, operational efficiency, and African impact.
- **Success Metrics** (Hackathon Demo):
  - 50+ transactions (mint/trade/retire).
  - 10+ simulated users (farmers/investors via test wallets).
  - Mock Impact: 500 tons CO2 tokenized, equivalent to offsets for 100 African households.
- **Long-Term Metrics**: 1M+ farmers onboarded; $1B+ in tokenized assets; 50%+ investor retention via NFT incentives.

## 3. Target Users & Personas
| Persona | Description | Needs | Pain Points |
|---------|-------------|-------|-------------|
| **African Smallholder Farmer** (e.g., in Lagos or rural Nigeria) | Leads grassroots projects like regenerative farming or tree planting. | Simple mobile-friendly minting; instant token payouts; verifiable impact sharing. | Limited finance access; untrusted intermediaries; complex tech barriers. |
| **Climate Investor** | Global/SME seeking carbon NFTs for ESG portfolios or yields. | Liquid marketplace; metadata-rich NFTs (e.g., tons CO2, co-benefits); ROI incentives like royalties. | Fraudulent offsets; illiquid markets; lack of African-focused opportunities. |
| **Sustainability Verifier/NGO** | Auditors or partners (e.g., Regen-like entities) reviewing projects. | Immutable logs; mock/real proofs for SDG reporting. | Manual verifications; data silos in supply chains. |
| **Hackathon Participant/Judge** | Testing MVP for feasibility and innovation. | Intuitive UI demo; clear DeCFi flow. | Overly technical prototypes; unclear impact. |

**User Journey**: Onboard (wallet connect) → Submit farm project (mock verify) → Mint NFT → Trade in marketplace → Retire NFT → View impact vault (dashboard).

## 4. Key Features (MVP Scope)
Prioritized for hackathon build: Inclusive NFT tokenization loop with African focus. UI draws from provided Figma prototype (e.g., eco-green themes, simple forms, impact charts). Non-MVP: Advanced DeFi yields, cross-chain.

| Feature | Description | Priority | SDG Tie-In |
|---------|-------------|----------|------------|
| **Onboarding & Wallet Integration** | Connect via HashPack/Blade; no KYC for MVP (Guardian KYC in future). African-localized UI (e.g., English/Swahili placeholders). | High | Inclusive access (SDG 10: Reduced Inequalities). |
| **Project Submission & Mock Verification** | Farmers input data (e.g., farm GPS, tons CO2, photos); mock Regen protocol (JSON) to verify and generate NFT metadata. | High | Transparent operations (SDG 13: Climate Action). |
| **NFT Minting** | Create HTS NFTs (unique per project, metadata: tons CO2, co-benefits like biodiversity). Serialized for traceability "from soil to markets." | High | Empowering farmers (SDG 2: Zero Hunger). |
| **Marketplace Trading** | P2P NFT swaps with HBAR; 1% royalty to community fund as investor incentive. Simple order book from Figma. | High | Economic incentives (SDG 8: Decent Work). |
| **NFT Retirement & Certification** | Burn NFTs for retirement; generate mock SDG certificate (PDF via UI). | High | Accountability (SDG 16: Peace, Justice). |
| **Impact Vault Dashboard** | Visualize tokenized impacts (e.g., CO2 charts, co-benefits pies) using HCS logs and mock data. Figma-inspired analytics. | Medium | Partnerships & reporting (SDG 17). |
| **Guardian Roadmap Integration** | Mock outputs in MVP; plan for post-hack: Use Guardian 3.0 for Verra-compliant emissions, audits, and KYC. | Low (MVP) | Scalable compliance for global markets. |

**Out of Scope**: Real-time oracles, full mobile app (web-responsive only), live African partnerships.

## 5. Functional Requirements
- **FR-1**: Onboarding requires Hedera account association; support mock user roles (farmer/investor).
- **FR-2**: Submission form (from Figma) feeds JSON to mock verification (e.g., `{ "farm_id": "NG-001", "tons": 50, "methodology": "CarbonPlus_Grazing" }`); output NFT metadata.
- **FR-3**: Mint HTS NFTs with metadata (IPFS/CID for images/proofs); log events to HCS for transparency.
- **FR-4**: Trading enforces atomic swaps; royalties auto-transfer to treasury.
- **FR-5**: Dashboard queries Mirror Node for NFT balances; displays Figma-style charts (e.g., via Chart.js).
- **Non-Functional**: Mobile-responsive (375px+); <3s latency; GDPR-compliant mocks; African accessibility (e.g., low-data mode).

## 6. Technical Requirements & Stack
Hackathon-optimized for 24-48h build: Hedera natives + Figma UI export. HTS for NFTs (set `TokenType.NonFungibleUnique`).

### Core Tech Stack
| Component | Technology | Rationale | Resources/Dependencies |
|-----------|------------|-----------|------------------------|
| **Blockchain** | Hedera Testnet (Mainnet post-hack) | 10k+ TPS, carbon-negative, low fees for African users. | Portal.hedera.com (test HBAR); JS SDK v2.40+. |
| **Tokenization** | Hedera Token Service (HTS) - NFTs | Native unique tokens with metadata; royalties/KYC built-in. | `@hashgraph/sdk`; `TokenCreateTransaction` with NonFungibleUnique. |
| **Verification** | Mock JSON (Guardian/Regen-inspired) | Simulates emissions tracking; quick for MVP. | Static files (e.g., regen_carbonplus.json); Future: Guardian GitHub repo (Meeco/hedera-guardian). |
| **Consensus Logging** | Hedera Consensus Service (HCS) | Immutable "from soil" proofs. | HCS Topic; `TopicMessageSubmitTransaction`. |
| **Frontend** | React.js + Next.js | Figma-exportable UI; wallet integration. | HashPack SDK; Tailwind CSS; Chart.js for dashboard; Figma node 892-538 for screens. |
| **Backend** | Node.js + Express | Mock verification, trading logic. | Hedera JS SDK; Axios for mocks; IPFS/CID for NFT metadata. |
| **Data/Storage** | Mirror Node API | Free NFT queries. | REST: `/tokens/{id}/nfts`. |
| **Dev Tools** | VS Code, GitHub, Postman | Collaborative build. | Figma-to-Code plugin for UI import. |

### Integration Flow
1. Farmer submits via Figma-form UI → Backend mocks verification → Generates metadata JSON.
2. Mint NFT: Use HTS with metadata (e.g., URI to IPFS-hosted farm photo).
3. Log to HCS: `{ "event": "mint", "sdg": "13.2", "farm_id": "NG-001" }`.
4. Trade/Retire: UI calls backend for transactions; update dashboard via Mirror Node.

**Sample Code (NFT Minting with Mock Verification)**:
```javascript
const { Client, PrivateKey, TokenCreateTransaction, TokenMintTransaction, TokenType, CustomRoyaltyFee, Hbar } = require('@hashgraph/sdk');
const fs = require('fs');

// Client Setup
const client = Client.forTestnet().setOperator(myAccountId, myPrivateKey);

// Mock Verification (Guardian/Regen Style)
function mockVerification(projectData) {
  const mockRegen = JSON.parse(fs.readFileSync('mock_regen_carbonplus.json'));
  if (projectData.tons <= mockRegen.maxTons) {
    return { 
      metadata: { tons: projectData.tons, sdg: '13.2', coBenefits: ['biodiversity'], uri: 'ipfs://farm-proof-cid' },
      methodology: mockRegen.methodology
    };
  }
  throw new Error('Invalid farm data');
}

// Create NFT Token & Mint
async function mintNft(projectData) {
  const { metadata } = mockVerification(projectData);
  
  // Create NFT Token
  const royaltyFee = new CustomRoyaltyFee()
    .setNumerator(1)
    .setDenominator(100)
    .setFeeCollectorAccountId(treasuryId);
  
  const createTx = await new TokenCreateTransaction()
    .setTokenName('VerdantVaultNFT')
    .setTokenSymbol('VVNFT')
    .setTokenType(TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(myAccountId)
    .setSupplyKey(myPrivateKey.publicKey)
    .setCustomFees([royaltyFee])
    .setMaxTransactionFee(new Hbar(30))
    .execute(client);
  const tokenId = (await createTx.getReceipt(client)).tokenId;

  // Mint NFT with Metadata
  const mintTx = await new TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(JSON.stringify(metadata))])  // Serialized metadata
    .execute(client);
  console.log(`Minted VVNFT for ${metadata.tons} tons CO2`);

  // HCS Log
  await new TopicMessageSubmitTransaction()
    .setTopicId(topicId)
    .setMessage(JSON.stringify({ event: 'mint', sdg: metadata.sdg, tons: metadata.tons }))
    .execute(client);
}
```

**Mock JSON Example** (`mock_regen_carbonplus.json`):
```json
{
  "methodology": "CarbonPlus Grazing for African Farms",
  "maxTons": 1000,
  "sdg": "13.2",
  "coBenefits": ["soil health", "poverty alleviation"]
}
```

**Security**: Env vars for keys; HCS for audits; IPFS for decentralized metadata.

## 7. Dependencies & Risks
- **Dependencies**: Hedera test accounts; Figma export; Mock JSON (prepped from Regen/Klima docs).
- **Risks**: Hack time limits—focus on core loop; Mock data gaps—use for demo only; UI import issues—fallback to basic Tailwind.
- **Assumptions**: 2-4 devs (JS/Hedera skills); African test data (e.g., Lagos GPS mocks); No live NFTs (testnet only).

## 8. Development Timeline (Hackathon: Oct 24-25, 2025)
| Phase | Tasks | Duration | Owner |
|-------|-------|----------|-------|
| **Setup (Oct 24 AM)** | Hedera setup, Figma import to React, mock JSON prep. | 2h | All |
| **Core Build (Oct 24 PM)** | Submission form, mock verify, HTS NFT minting. | 6h | Backend Lead |
| **Features (Oct 25 AM)** | Marketplace trading, retirement, HCS logging, dashboard. | 4h | Frontend Lead |
| **Testing & Pitch (Oct 25 PM)** | 50+ tx demos, UI polish, submission prep. | 2h | QA/All |

**Total Effort**: 14h; Extendable for integrations.

## 9. Future Roadmap
- **Q4 2025**: Integrate Guardian 3.0 (1-2 months: API for Verra emissions, KYC).
- **Q1 2026**: Live Regen partnerships; Mobile app; DeFi yields (staking via HSCS).
- **Q2 2026+**: Scale to 1M farmers; Interoperability (e.g., Polygon bridge for KlimaDAO).

## 10. Appendix: SDG Alignment & Impact
- **Core SDGs**: 13 (Climate Action via NFTs), 1 (Poverty alleviation through payouts), 2 (Sustainable ag via Regen mocks).
- **Mock Impact**: 500 tons = Offsets for 100 households; Co-benefits: Soil health for African roots.
- **Inspirations**: KlimaDAO (RWA backing), Regen (protocols), Figma UI (visual flow).

This PRD synthesizes all discussions—use it to kick off building! Fork the code snippet, import Figma, and focus on the mint-trade loop for a winning demo. If you need refinements (e.g., more code, wireframes), let me know.
