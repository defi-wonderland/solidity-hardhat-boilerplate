import { BigNumber, utils } from 'ethers';
import { expect } from 'chai';

export const expectToEqualWithThreshold = ({
  value,
  to,
  threshold,
}: {
  value: BigNumber | number | string;
  to: BigNumber | number | string;
  threshold: BigNumber | number | string;
}): void => {
  value = toBN(value);
  to = toBN(to);
  threshold = toBN(threshold);
  expect(
    to.sub(threshold).lte(value) && to.add(threshold).gte(value),
    `Expected ${value.toString()} to be between ${to.sub(threshold).toString()} and ${to.add(threshold).toString()}`
  ).to.be.true;
};

export const toBN = (value: string | number | BigNumber): BigNumber => {
  return BigNumber.isBigNumber(value) ? value : BigNumber.from(value);
};

export const toUnit = (value: number): BigNumber => {
  return utils.parseUnits(value.toString());
};
