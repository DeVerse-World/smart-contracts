import { task } from "hardhat/config";
import '@nomiclabs/hardhat-waffle'
import 'hardhat-deploy'
import 'dotenv/config';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-ethers'; // aliased to hardhat-deploy-ethers
import '@nomiclabs/hardhat-ganache';
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
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
      {
        version: '0.5.9',
        settings: {
          optimizer: {
            enabled: true,
            runs: 2000,
          },
        },
      },
    ]
  },
  network: {
    hardhat: {
      chainId: 31337,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      gas: 12000000,
    },
  },
  namedAccounts: {
    deployer: {
      default: 1,
    },
    deverseAdmin: {
      default: 2,
    },
    assetBouncerAdmin: 'deverseAdmin'
  }
};
