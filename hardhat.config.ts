import { task } from "hardhat/config";
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy'
import 'dotenv/config';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'; // aliased to hardhat-deploy-ethers
import 'hardhat-gas-reporter';
import '@openzeppelin/hardhat-upgrades';
import 'solidity-coverage';
import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  network: {
    hardhat: {
      chainId: 31337
    },
  }
};
