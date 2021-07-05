import UniswapV2FactoryContract from '@uniswap/v2-core/build/UniswapV2Factory.json';
import UniswapV2Router02Contract from '@uniswap/v2-periphery/build/UniswapV2Router02.json';
import IUniswapV2Pair from '@uniswap/v2-core/build/IUniswapV2Pair.json';
import WETHContract from '@uniswap/v2-periphery/build/WETH9.json';
import { deployContract } from 'ethereum-waffle';
import { BigNumber, Contract, Signer } from 'ethers';
import { ethers } from 'hardhat';

let WETH: Contract, uniswapV2Factory: Contract, uniswapV2Router02: Contract;

const getWETH = () => WETH;
const getUniswapV2Factory = () => uniswapV2Factory;
const getUniswapV2Router02 = () => uniswapV2Router02;

const deploy = async ({ owner }: { owner: Signer }) => {
  WETH = await deployContract(owner, WETHContract);
  uniswapV2Factory = await deployContract(owner, UniswapV2FactoryContract, [await owner.getAddress()]);
  uniswapV2Router02 = await deployContract(owner, UniswapV2Router02Contract, [uniswapV2Factory.address, WETH.address], { gasLimit: 9500000 });
  return {
    WETH,
    uniswapV2Factory,
    uniswapV2Router02,
  };
};

const createPair = async ({ token0, token1 }: { token0: Contract; token1: Contract }) => {
  await uniswapV2Factory.createPair(token0.address, token1.address);
  const pairAddress = await uniswapV2Factory.getPair(token0.address, token1.address);
  const pair = await ethers.getContractAt(IUniswapV2Pair.abi, pairAddress);
  return pair;
};

const addLiquidity = async ({
  owner,
  token0,
  amountA,
  token1,
  amountB,
}: {
  owner: Signer;
  token0: Contract;
  amountA: BigNumber;
  token1: Contract;
  amountB: BigNumber;
}) => {
  await token0.approve(uniswapV2Router02.address, amountA);
  await token1.approve(uniswapV2Router02.address, amountB);
  await uniswapV2Router02.addLiquidity(
    token0.address,
    token1.address,
    amountA,
    amountB,
    amountA,
    amountB,
    await owner.getAddress(),
    ethers.BigNumber.from('2').pow('256').sub('2'),
    {
      gasLimit: 9500000,
    }
  );
};

const addLiquidityETH = async ({
  owner,
  token0,
  token0mount,
  wethAmount,
}: {
  owner: Signer;
  token0: Contract;
  token0mount: BigNumber;
  wethAmount: BigNumber;
}) => {
  await token0.approve(uniswapV2Router02.address, token0mount);
  await uniswapV2Router02.addLiquidityETH(
    token0.address,
    token0mount,
    token0mount,
    wethAmount,
    await owner.getAddress(),
    ethers.BigNumber.from('2').pow('256').sub('2'),
    {
      gasLimit: 9500000,
      value: wethAmount,
    }
  );
};

export default {
  getWETH,
  getUniswapV2Factory,
  getUniswapV2Router02,
  deploy,
  createPair,
  addLiquidity,
  addLiquidityETH,
};
