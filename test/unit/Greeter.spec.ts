import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Greeter, Greeter__factory } from '@typechained';
import { evm } from '@utils';

describe('Greeter', function () {
  let greeter: Greeter;
  let greeterFactory: Greeter__factory;
  let snapshotId: string;

  before(async () => {
    greeterFactory = (await ethers.getContractFactory('Greeter')) as Greeter__factory;
    greeter = await greeterFactory.deploy('Hello, world!');
    snapshotId = await evm.snapshot.take();
  });
  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);
  });
  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');

    await new Promise((res) => setTimeout(res, 5000));
  });
  it('Should revert if greeting is empty', async function () {
    await expect(greeter.setGreeting('')).to.be.revertedWith('EmptyGreeting');
  });
});
