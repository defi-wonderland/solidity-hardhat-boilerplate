import { Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { JsonRpcSigner } from '@ethersproject/providers';

const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return ethers.provider.getSigner(address);
};

const generateRandom = async () => {
  const wallet = (await Wallet.createRandom()).connect(ethers.provider);
  return wallet;
};

const generateRandomAddress = async () => {
  const wallet = await Wallet.createRandom();
  return wallet.address;
};

export default {
  impersonate,
  generateRandom,
  generateRandomAddress,
};
