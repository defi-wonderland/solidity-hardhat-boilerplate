import { BigNumber, Contract } from 'ethers';
import { ethers } from 'hardhat';

export const deploy = async ({
  name,
  symbol,
  decimals,
  initialAccount,
  initialAmount,
}: {
  name: string;
  symbol: string;
  decimals?: BigNumber | number;
  initialAccount: string;
  initialAmount: BigNumber;
}): Promise<Contract> => {
  const erc20MockContract = await ethers.getContractFactory('contracts/mocks/ERC20Mock.sol:ERC20Mock');
  const deployedContract = await erc20MockContract.deploy(name, symbol, decimals || 18, initialAccount, initialAmount);
  return deployedContract;
};
