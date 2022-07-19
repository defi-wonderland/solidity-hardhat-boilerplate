import { constants, Wallet } from 'ethers';
import { ethers } from 'hardhat';
import { getAddress } from 'ethers/lib/utils';
import { randomHex } from 'web3-utils';
import helpers from '@nomicfoundation/hardhat-network-helpers';

export const generateRandom = async () => {
  const wallet = (await Wallet.createRandom()).connect(ethers.provider);
  await helpers.setBalance(wallet.address, constants.MaxUint256);
  return wallet;
};

export const generateRandomAddress = () => {
  return getAddress(randomHex(20));
};
