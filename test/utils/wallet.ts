import { constants, Wallet } from 'ethers';
import { ethers } from 'hardhat';
import { JsonRpcSigner } from '@ethersproject/providers';
import { getAddress } from 'ethers/lib/utils';
import { randomHex } from 'web3-utils';
import { impersonateAccount, setBalance } from '@nomicfoundation/hardhat-network-helpers';

export const impersonate = async (address: string): Promise<JsonRpcSigner> => {
  await impersonateAccount(getAddress(address));
  return ethers.provider.getSigner(address);
};

export const generateRandom = async () => {
  const wallet = (await Wallet.createRandom()).connect(ethers.provider);
  await setBalance(wallet.address, constants.MaxUint256);
  return wallet;
};

export const generateRandomAddress = () => {
  return getAddress(randomHex(20));
};
