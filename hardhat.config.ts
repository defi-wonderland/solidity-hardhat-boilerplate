import 'dotenv/config';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-etherscan';
import '@typechain/hardhat';
import '@typechain/hardhat/dist/type-extensions';
import { removeConsoleLog } from 'hardhat-preprocessor';
import 'hardhat-gas-reporter';
import 'hardhat-deploy';
import 'solidity-coverage';
import { HardhatUserConfig, MultiSolcUserConfig, NetworksUserConfig } from 'hardhat/types';
import * as env from './utils/env';
import 'tsconfig-paths/register';

const networks: NetworksUserConfig =
  env.isHardhatCompile() || env.isTesting()
    ? {}
    : {
        hardhat: {
          forking: {
            enabled: process.env.FORK ? true : false,
            url: env.getNodeUrl('mainnet'),
          },
        },
        kovan: {
          url: env.getNodeUrl('kovan'),
          accounts: env.getAccounts('kovan'),
        },
        mainnet: {
          url: env.getNodeUrl('mainnet'),
          accounts: env.getAccounts('mainnet'),
        },
      };

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  mocha: {
    timeout: process.env.MOCHA_TIMEOUT || 300000,
  },
  networks,
  solidity: {
    compilers: [
      {
        version: '0.8.11',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: process.env.COINMARKETCAP_DEFAULT_CURRENCY || 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    enabled: process.env.REPORT_GAS ? true : false,
    showMethodSig: true,
    onlyCalledMethods: false,
  },
  preprocess: {
    eachLine: removeConsoleLog((hre) => hre.network.name !== 'hardhat'),
  },
  etherscan: {
    apiKey: env.getEtherscanAPIKeys(['mainnet']),
  },
  typechain: {
    outDir: 'typechained',
    target: 'ethers-v5',
  },
  paths: {
    sources: './solidity',
  },
};

if (process.env.TEST) {
  (config.solidity as MultiSolcUserConfig).compilers = (config.solidity as MultiSolcUserConfig).compilers.map((compiler) => {
    return {
      ...compiler,
      outputSelection: {
        '*': {
          '*': ['storageLayout'],
        },
      },
    };
  });
}

export default config;
