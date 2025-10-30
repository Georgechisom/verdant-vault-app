import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const carbonTokenAddress = "0x00000000000000000000000000000000006d3cab";

  console.log("Deploying VerdantVault with token:", carbonTokenAddress);

  const VerdantVault = await ethers.getContractFactory("VerdantVault");
  const verdantVault = await VerdantVault.deploy(carbonTokenAddress);

  const tx = await verdantVault.deploymentTransaction()?.wait();

  console.log("VerdantVault deployed to:", tx?.contractAddress);
  console.log("Carbon Token:", carbonTokenAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});