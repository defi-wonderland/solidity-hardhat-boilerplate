import { ethers } from 'hardhat';
import { DeployResult } from 'hardhat-deploy/dist/types';
import { HardhatNetworkUserConfig, HardhatRuntimeEnvironment } from 'hardhat/types';

let testChainId: number;

export const setTestChainId = (chainId: number): void => {
  testChainId = chainId;
};

export const getChainId = async (hre: HardhatRuntimeEnvironment): Promise<number> => {
  if (!!process.env.TEST) {
    if (!testChainId) throw new Error('Should specify chain id of test');
    return testChainId;
  }
  if (!!process.env.FORK) return getRealChainIdOfFork(hre);
  return parseInt(await hre.getChainId());
};

export const getRealChainIdOfFork = (hre: HardhatRuntimeEnvironment): number => {
  const config = hre.network.config as HardhatNetworkUserConfig;
  if (config.forking?.url.includes('eth')) return 1;
  if (config.forking?.url.includes('ftm') || config.forking?.url.includes('fantom')) return 250;
  if (config.forking?.url.includes('polygon')) return 137;
  throw new Error('Should specify chain id of fork');
};

export const shouldVerifyContract = async (deploy: DeployResult): Promise<boolean> => {
  if (process.env.FORK || process.env.TEST) return false;
  if (!deploy.newlyDeployed) return false;
  const txReceipt = await ethers.provider.getTransaction(deploy.receipt!.transactionHash);
  await txReceipt.wait(10);
  return true;
};
