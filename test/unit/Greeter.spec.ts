import { expect } from 'chai';
import { ethers } from 'hardhat';
import { Greeter, Greeter__factory } from '@typechained';

describe('Greeter', function () {
  let greeter: Greeter;
  let greeterFactory: Greeter__factory;
  before(async () => {
    greeterFactory = (await ethers.getContractFactory('Greeter')) as Greeter__factory;
  });
  beforeEach(async () => {
    greeter = await greeterFactory.deploy('Hello, world!');
  });
  it("Should return the new greeting once it's changed", async function () {
    expect(await greeter.greet()).to.equal('Hello, world!');

    await greeter.setGreeting('Hola, mundo!');
    expect(await greeter.greet()).to.equal('Hola, mundo!');

    await new Promise((res) => setTimeout(res, 5000));
  });
});
