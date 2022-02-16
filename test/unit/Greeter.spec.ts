import chai, { expect } from 'chai';
import { MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { Greeter, Greeter__factory } from '@typechained';
import { evm } from '@utils';

chai.use(smock.matchers);

describe('Greeter', () => {
  let greeter: MockContract<Greeter>;
  let greeterFactory: MockContractFactory<Greeter__factory>;
  let snapshotId: string;

  before(async () => {
    greeterFactory = await smock.mock<Greeter__factory>('Greeter');
    greeter = await greeterFactory.deploy('Hello, world!');

    snapshotId = await evm.snapshot.take();
  });

  beforeEach(async () => {
    await evm.snapshot.revert(snapshotId);
  });

  it('should return current greeting', async () => {
    await greeter.setVariable('greeting', 'Hello, world!');

    expect(await greeter.greet()).to.equal('Hello, world!');
  });

  it('should return the new greeting once is changed', async () => {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hello, world!');
    expect(await greeter.greet()).to.equal('Hello, world!');
  });

  it('should revert if greeting is empty', async () => {
    await expect(greeter.setGreeting('')).to.be.revertedWith('EmptyGreeting');
  });
});
