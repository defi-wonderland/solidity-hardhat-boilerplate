import chai, { expect } from 'chai';
import { takeSnapshot, SnapshotRestorer } from '@nomicfoundation/hardhat-network-helpers';
import { MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import { Greeter, Greeter__factory } from '@typechained';

chai.use(smock.matchers);

describe('Greeter', () => {
  let greeter: MockContract<Greeter>;
  let greeterFactory: MockContractFactory<Greeter__factory>;
  let snapshot: SnapshotRestorer;

  before(async () => {
    greeterFactory = await smock.mock<Greeter__factory>('Greeter');
    greeter = await greeterFactory.deploy('Hello, world!');
    snapshot = await takeSnapshot();
  });

  beforeEach(async () => {
    await snapshot.restore();
  });

  it('should return current greeting', async () => {
    await greeter.setVariable('greeting', 'Hello, world!');

    expect(await greeter.greet()).to.equal('Hello, world!');
  });

  it('should return the new greeting once is changed', async () => {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');
  });

  it('should revert if greeting is empty', async () => {
    await expect(greeter.setGreeting('')).to.be.revertedWithCustomError(greeter, 'EmptyGreeting');
  });
});
