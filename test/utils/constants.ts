import { BigNumber } from 'ethers';

export const ZERO = BigNumber.from('0');
export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';
export const NOT_ZERO_ADDRESS = '0x0000000000000000000000000000000000000001';
export const MAX_INT_256 = BigNumber.from('2').pow('255').sub(1);
export const MAX_UINT_256 = BigNumber.from('2').pow('256').sub(1);
export const MIN_INT_256 = BigNumber.from('-0x8000000000000000000000000000000000000000000000000000000000000000');
