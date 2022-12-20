import BigNumber from 'bignumber.js';
import { ethers } from 'ethers';

type Token = {
  decimals: number;
};

export default function usePairDetails(
  token0: Token,
  token1: Token,
  event: any,
  tokenOfInterest: string,
) {
  const { token0Price, token1Price } = event;
  const data = event?.data;

  let amount;
  let total;
  let amountOfInterest;

  if (data?.amount0 && data?.amount0[0] !== '-') {
    amount = BigNumber(
      ethers.utils.formatUnits(data?.amount0, token0?.decimals),
    );
    total = BigNumber(token0Price).multipliedBy(amount);

    if (tokenOfInterest === 'token0') {
      amountOfInterest = amount;
    }
    
    if (tokenOfInterest === 'token1') {
      amountOfInterest = BigNumber(
        ethers.utils.formatUnits(data?.amount1, token1?.decimals),
      );
    }
  }

  if (data?.amount0Out && data?.amount0Out !== '0') {
    amount = BigNumber(
      ethers.utils.formatUnits(data?.amount0Out, token0?.decimals),
    );
    total = BigNumber(token0Price).multipliedBy(amount);

    if (tokenOfInterest === 'token0') {
      amountOfInterest = amount;
    }
    
    if (tokenOfInterest === 'token1' && data?.amount1In) {
      amountOfInterest = BigNumber(
        ethers.utils.formatUnits(data?.amount1In, token1?.decimals),
      );
    }
  }

  if (data?.amount1 && data?.amount1[0] !== '-') {
    amount = BigNumber(
      ethers.utils.formatUnits(data?.amount1, token1?.decimals),
    );
    total = BigNumber(token1Price).multipliedBy(amount);

    if (tokenOfInterest === 'token0') {
      amountOfInterest = BigNumber(
        ethers.utils.formatUnits(data?.amount0, token0?.decimals),
      );
    }
    
    if (tokenOfInterest === 'token1') {
      amountOfInterest = amount;
    }
  }

  if (data?.amount1Out && data?.amount1Out !== '0') {
    amount = BigNumber(
      ethers.utils.formatUnits(data?.amount1Out, token1?.decimals),
    );
    total = BigNumber(token1Price).multipliedBy(amount);

    if (tokenOfInterest === 'token0' && data?.amount0In) {
      amountOfInterest = BigNumber(
        ethers.utils.formatUnits(data?.amount0In, token0?.decimals),
      );
    }
    
    if (tokenOfInterest === 'token1') {
      amountOfInterest = amount;
    }
  }

  return {
    data: {
      amount: amount?.dp(2).toString(),
      amountOfInterest: amountOfInterest?.dp(2).toString(),
      total: total?.dp(2).toString(),
    },
  };
}
