import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { DeployFunction } from 'hardhat-deploy/types';
import { getChainId, shouldVerifyContract } from '../utils/deploy';

export const INITIAL_GREET: { [chainId: string]: string } = {
  '1': 'Halo!',
  '137': 'Halo to polygon network!',
  '31337': 'Hello',
};

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();

  const chainId = await getChainId(hre);

  const deploy = await hre.deployments.deploy('Greeter', {
    contract: 'solidity/contracts/Greeter.sol:Greeter',
    from: deployer,
    args: [INITIAL_GREET[chainId]],
    log: true,
  });

  if (await shouldVerifyContract(deploy)) {
    await hre.run('verify:verify', {
      address: deploy.address,
      constructorArguments: [INITIAL_GREET[chainId]],
    });
  }
};
deployFunction.dependencies = [];
deployFunction.tags = ['Greeter'];
export default deployFunction;
