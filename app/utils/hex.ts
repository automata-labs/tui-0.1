import { BigNumber } from '@ethersproject/bignumber';
import { hexlify } from '@ethersproject/bytes';

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
  if (!value) {
    return '';
  }

  return `${value.substring(0, 6)}...${value.substring(
    value.length - 4,
    value.length,
  )}`;
}

export function shorten(address: string) {
  return `${address.substring(0, 6)}....${address.substring(address.length - 4)}`
}
