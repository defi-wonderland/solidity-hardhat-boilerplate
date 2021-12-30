import { Contract, ContractFactory } from '@ethersproject/contracts';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { BigNumber, ContractInterface, Signer } from 'ethers';
import { network } from 'hardhat';
import { getStatic } from 'ethers/lib/utils';

export const deploy = async (contract: ContractFactory, args: any[]): Promise<{ tx: TransactionResponse; contract: Contract }> => {
  const deploymentTransactionRequest = await contract.getDeployTransaction(...args);
  const deploymentTx = await contract.signer.sendTransaction(deploymentTransactionRequest);
  const contractAddress = getStatic<(deploymentTx: TransactionResponse) => string>(contract.constructor, 'getContractAddress')(deploymentTx);
  const deployedContract = getStatic<(contractAddress: string, contractInterface: ContractInterface, signer?: Signer) => Contract>(
    contract.constructor,
    'getContract'
  )(contractAddress, contract.interface, contract.signer);
  return {
    tx: deploymentTx,
    contract: deployedContract,
  };
};

export const setBalance = async (address: string, amount: BigNumber): Promise<void> => {
  await network.provider.send('hardhat_setBalance', [address, amount.toHexString().replace('0x0', '0x')]);
};
