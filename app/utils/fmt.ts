import BigNumber from "bignumber.js";

export function formatUsd(num: any) {
  if (num === 0 || num === '0') {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num)
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
    maximumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
  }).format(num);
}

export function formatCoin(num: any, symbol?: string) {
  let result;

  if (num === 0 || num === '0') {
    result = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 1,
      maximumFractionDigits: 1,
    }).format(num);
  } else {
    result = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
      maximumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
    }).format(num);
  }

  if (symbol) {
    return result + ` ${symbol}`;
  } else {
    return result;
  }
}
