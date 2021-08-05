import 'dotenv/config';
import '@typechain/hardhat';
import '@typechain/hardhat/dist/type-extensions';
import '@nomiclabs/hardhat-ethers';
import '@nomiclabs/hardhat-waffle';
import '@nomiclabs/hardhat-etherscan';
import { removeConsoleLog } from 'hardhat-preprocessor';
import 'hardhat-gas-reporter';
import 'solidity-coverage';
import { HardhatUserConfig, NetworksUserConfig } from 'hardhat/types';
import 'tsconfig-paths/register';
import { getNodeUrl, accounts } from './utils/network';

const networks: NetworksUserConfig = process.env.TEST
  ? {}
  : {
      hardhat: {
        forking: {
          enabled: process.env.FORK ? true : false,
          url: getNodeUrl('ropsten'),
        },
      },
      localhost: {
        url: getNodeUrl('localhost'),
        accounts: accounts('localhost'),
      },
      kovan: {
        url: getNodeUrl('kovan'),
        accounts: accounts('kovan'),
        gasPrice: 'auto',
      },
      rinkeby: {
        url: getNodeUrl('rinkeby'),
        accounts: accounts('rinkeby'),
        gasPrice: 'auto',
      },
      ropsten: {
        url: getNodeUrl('ropsten'),
        accounts: accounts('ropsten'),
        gasPrice: 'auto',
      },
      mainnet: {
        url: getNodeUrl('mainnet'),
        accounts: accounts('mainnet'),
        gasPrice: 'auto',
      },
    };

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  networks,
  solidity: {
    compilers: [
      {
        version: '0.8.4',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          outputSelection: {
            '*': {
              '*': ['storageLayout'],
            },
          },
        },
      },
    ],
  },
  gasReporter: {
    currency: process.env.COINMARKETCAP_DEFAULT_CURRENCY || 'USD',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  preprocess: {
    eachLine: removeConsoleLog((hre) => hre.network.name !== 'hardhat'),
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  typechain: {
    outDir: 'typechained',
    target: 'ethers-v5',
  },
};

export default config;
