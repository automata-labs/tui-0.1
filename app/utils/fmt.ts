import BigNumber from "bignumber.js";

export function formatUsd(num: any) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
    maximumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
  }).format(num);
}

export function formatCoin(num: any, symbol?: string) {
  const result = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
    maximumFractionDigits: BigNumber(num).gte(1) ? 2 : 4,
  }).format(num);

  if (symbol) {
    return result + ` ${symbol}`;
  } else {
    return result;
  }
}
