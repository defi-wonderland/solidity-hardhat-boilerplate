import { Wallet } from 'ethers';
import { ethers, network } from 'hardhat';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getAddress } from 'ethers/lib/utils';
import { randomHex } from 'web3-utils';

export const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await network.provider.request({
    method: 'hardhat_impersonateAccount',
    params: [address],
  });
  return ethers.provider.getSigner(address);
};

export const generateRandom = async () => {
  return (await Wallet.createRandom()).connect(ethers.provider);
};

export const generateRandomAddress = () => {
  return getAddress(randomHex(20));
};
