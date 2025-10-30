import {
  Client,
  PrivateKey,
  AccountId,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  TokenMintTransaction,
  Hbar,
} from "@hashgraph/sdk";

async function deployCarbonCreditToken() {
  // Setup client
  const operatorId = AccountId.fromString("0.0.7158078");
  const operatorKey = PrivateKey.fromStringECDSA("0xcac7f3bd8a6d838d0c29bf5d4ffb806a4f0cd968be984cce039a438615d638b1");

  const client = Client.forTestnet(); // or Client.forMainnet()
  client.setOperator(operatorId, operatorKey);

  console.log("Creating Carbon Credit Token...");

  // Create fungible token
  const tokenCreateTx = await new TokenCreateTransaction()
    .setTokenName("Carbon Credit Token")
    .setTokenSymbol("CCT")
    .setDecimals(18)
    .setInitialSupply(0) // Start with 0, mint as needed
    .setTreasuryAccountId(operatorId)
    .setSupplyType(TokenSupplyType.Infinite)
    .setTokenType(TokenType.FungibleCommon)
    .setSupplyKey(operatorKey) // Needed for minting
    .setAdminKey(operatorKey) // For token management
    .setMaxTransactionFee(new Hbar(30))
    .freezeWith(client);

  const tokenCreateSign = await tokenCreateTx.sign(operatorKey);
  const tokenCreateSubmit = await tokenCreateSign.execute(client);
  const tokenCreateRx = await tokenCreateSubmit.getReceipt(client);
  const tokenId = tokenCreateRx.tokenId;

  console.log(`✅ Token Created: ${tokenId}`);
  console.log(`Token Address: ${tokenId?.toSolidityAddress()}`);

  // Get token info
  console.log("\nToken Details:");
  console.log(`- Name: Carbon Credit Token`);
  console.log(`- Symbol: CCT`);
  console.log(`- Decimals: 18`);
  console.log(`- Type: Fungible`);
  console.log(`- Supply Type: Infinite`);
  console.log(`- Token ID: ${tokenId}`);
  console.log(`- Solidity Address: 0x${tokenId?.toSolidityAddress()}`);

  return {
    tokenId: tokenId?.toString(),
    solidityAddress: `0x${tokenId?.toSolidityAddress()}`,
  };
}

// Run the script
deployCarbonCreditToken()
  .then((result) => {
    console.log("\n✅ Deployment Complete!");
    console.log("\nAdd to your .env:");
    console.log(`NEXT_PUBLIC_CARBON_TOKEN_ID=${result.tokenId}`);
    console.log(`NEXT_PUBLIC_CARBON_TOKEN_ADDRESS=${result.solidityAddress}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error("❌ Deployment Failed:", error);
    process.exit(1);
  });