import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.0",
  networks: {
    hedera_testnet: {
      url: "https://testnet.hashio.io/api",
      // Replace with the private key of the account you want to deploy with
      accounts: ["b7510d20d13cf0ce0736c69d8d9a8e249996855ea384b748cfbff972ede55212"],
    },
  },
};

export default config;