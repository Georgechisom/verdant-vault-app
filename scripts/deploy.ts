import pkg from "hardhat";
const { ethers } = pkg;

async function main() {
  const VerdantVault = await ethers.getContractFactory("VerdantVault");
  const verdantVault = await VerdantVault.deploy();

  const tx = await verdantVault.deploymentTransaction().wait();

  console.log("VerdantVault deployed to:", tx.contractAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
