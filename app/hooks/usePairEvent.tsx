type Token = {
  decimals: number;
};

export default function usePairDetails(
  token0: Token,
  token1: Token,
  event: any,
  tokenOfInterest: string,
) {
  return {
    data: {
      price: event?.data?.priceUsd,
      total: event?.data?.priceUsdTotal,
      amount: event?.data?.amountNonLiquidityToken,

      lp0: event?.data?.amount0Shifted,
      lp1: event?.data?.amount1Shifted,
    },
  };
}
