import { hexlify } from '@ethersproject/bytes';
import { BigNumber } from '@ethersproject/bignumber';

export function hexify(value: string) {
  if (!value) {
    return undefined;
  }

  return hexlify(BigNumber.from(value));
}

export function decimalify(value: string) {
  if (!value) {
    return undefined;
  }

  return BigNumber.from(value).toString();
}

export function hashid(value: string) {
  return `${value.substring(0, 6)}...${value.substring(value.length - 4, value.length)}`;
}
