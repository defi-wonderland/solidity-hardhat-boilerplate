import { getMainnetSdk } from '@dethcrypto/eth-sdk-client';
import { Dai } from '@eth-sdk-types';
import { TransactionResponse } from '@ethersproject/abstract-provider';
import { JsonRpcSigner } from '@ethersproject/providers';
import { BigNumber, utils } from 'ethers';
import { ethers } from 'hardhat';
import { evm, wallet } from '@utils';
import { given, then, when } from '@utils/bdd';
import { expect } from 'chai';
import { getNodeUrl } from 'utils/env';
import forkBlockNumber from './fork-block-numbers';
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';

const daiWhaleAddress = '0x16463c0fdb6ba9618909f5b120ea1581618c1b9e';

describe('DAI @skip-on-coverage', () => {
  let stranger: SignerWithAddress;
  let daiWhale: JsonRpcSigner;
  let dai: Dai;
  let snapshotId: string;

  before(async () => {
    [stranger] = await ethers.getSigners();
    await evm.reset({
      jsonRpcUrl: getNodeUrl('ethereum'),
      blockNumber: forkBlockNumber.dai,
    });

    const sdk = getMainnetSdk(stranger);
    dai = sdk.dai;

    daiWhale = await wallet.impersonate(daiWhaleAddress);
    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);
  });

  describe('transfer', () => {
    when('user doesnt have funds', () => {
      let transferTx: Promise<TransactionResponse>;

      given(async () => {
        // There is no need to connect the dai contract to stranger
        // since its the default signer.
        // That is just for template examples.
        transferTx = dai.connect(stranger).transfer(wallet.generateRandomAddress(), utils.parseEther('1'));
      });

      then('tx is reverted with reason', async () => {
        await expect(transferTx).to.be.revertedWith('Dai/insufficient-balance');
      });
    });

    when('user has funds', () => {
      let initialSenderBalance: BigNumber;
      let initialReceiverBalance: BigNumber;
      const amountToTransfer = utils.parseEther('1');

      given(async () => {
        // We use our dai whale's impersonated signer
        initialSenderBalance = await dai.balanceOf(daiWhale._address);
        initialReceiverBalance = await dai.balanceOf(stranger.address);
        await dai.connect(daiWhale).transfer(stranger.address, amountToTransfer);
      });

      then('funds are taken from sender', async () => {
        expect(await dai.balanceOf(daiWhale._address)).to.be.equal(initialSenderBalance.sub(amountToTransfer));
      });

      then('funds are given to receiver', async () => {
        expect(await dai.balanceOf(stranger.address)).to.be.equal(initialReceiverBalance.add(amountToTransfer));
      });
    });
  });
});
