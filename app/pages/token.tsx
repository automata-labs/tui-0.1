import '@formatjs/intl-numberformat/locale-data/en';
import '@formatjs/intl-numberformat/polyfill';
import { useParams } from '@remix-run/react';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import TokenChartClient from '~/client/token-chart.client';
import Icon from '~/components/icon';
import Image from '~/components/image';
import PairRow, { links as pairRowLinks } from '~/components/pair-row';
import Spinner from '~/components/spinner';
import { Tab } from '~/components/tabs';
import usePairs from '~/hooks/usePairs';
import useTokenDetails from '~/hooks/useTokenDetails';
import useTokenInfo from '~/hooks/useTokenInfo';
import useTokenTopPair from '~/hooks/useTokenTopPair';
import useTokenTotalSupply from '~/hooks/useTokenTotalSupply';
import styles from '~/styles/token.css';
import { formatCoin, formatUsd } from '~/utils/fmt';

export const links = () => {
  return [...pairRowLinks(), { rel: 'stylesheet', href: styles }];
};

export const handle = {
  tabs: (_: any, logo: boolean, i: number) => <TabsBar key={i} logo={logo} />,
};

function TabsBar({ logo }: any) {
  const { address } = useParams() as any;

  return (
    <>
      <Tab to={`/token/${address}`} label="Profile" />
      <Tab to={`/token/${address}/holders`} label="Holders" />
    </>
  );
}

export default function Page() {
  const { address } = useParams() as any;
  const [mounted, setMounted] = useState(false);

  const { data: info, loading: loadingInfo } = useTokenInfo(address);
  const { data: details, loading: loadingDetails } = useTokenDetails(address);
  const { data: totalSupply, loading: loadingTotalSupply } =
    useTokenTotalSupply(address);
  const { data: pair, loading: loadingPair } = useTokenTopPair(address, '1W');
  const {
    data: pairs,
    // loading: loadingPairs,
    // fetching,
    // hasNextPage,
    // fetchNextPage,
  } = usePairs(address);

  let _totalSupply;
  let topPoolSymbol;
  let price;
  let liquidity;
  let volume24h;
  let txnCount24h;

  if (details?.supply?.totalSupply) {
    _totalSupply = details?.supply?.totalSupply;
  } else if (totalSupply?.totalSupply && info?.decimals) {
    _totalSupply = ethers.utils.formatUnits(
      totalSupply?.totalSupply,
      info?.decimals,
    );
  }

  if (loadingPair) {
    topPoolSymbol = <Spinner kind="simpleDotsScrolling" />;
  } else {
    if (pair?.pair?.token0?.symbol) {
      topPoolSymbol = (
        <>
          {pair?.pair?.token0?.symbol}/{pair?.pair?.token1?.symbol}{' '}
          <span className="opacity-50">Pool</span>
        </>
      );
    } else {
      topPoolSymbol = 'N/A';
    }
  }

  if (loadingPair) {
    price = <Spinner kind="simpleDotsScrolling" />;
  } else {
    if (pair?.chart?.length > 0) {
      price = formatUsd(pair?.chart[pair?.chart?.length - 1].y);
    } else {
      price = 'N/A';
    }
  }

  if (loadingPair) {
    liquidity = <Spinner kind="simpleDotsScrolling" />;
  } else {
    if (pair?.pair?.liquidity) {
      liquidity = formatUsd(pair?.pair?.liquidity);
    } else {
      liquidity = 'N/A';
    }
  }

  if (loadingPair) {
    volume24h = <Spinner kind="simpleDotsScrolling" />;
  } else {
    if (pair?.pair?.volumeUSD24) {
      volume24h = formatUsd(pair?.pair?.volumeUSD24);
    } else {
      volume24h = 'N/A';
    }
  }

  if (loadingPair) {
    txnCount24h = <Spinner kind="simpleDotsScrolling" />;
  } else {
    if (pair?.pair?.txnCount24) {
      txnCount24h = formatUsd(pair?.pair?.txnCount24);
    } else {
      txnCount24h = 'N/A';
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="page">
      <div className="header flex flex-col items-center">
        <div className="metadata flex flex-col items-center">
          <div className="image-wrapper">
            <Image className="image" src={info?.logo} alt={info?.name} />
          </div>
          <div className="flex flex-col items-center">
            <div className="flex gap-1 text-sm">
              {loadingInfo ? (
                <Spinner kind="line" />
              ) : (
                <>
                  <div>{info?.name}</div>
                  <div className="opacity-50">{info?.symbol}</div>
                </>
              )}
            </div>
            <div className="opacity-50">{address}</div>
          </div>
        </div>

        <div className="flex gap-10">
          {loadingDetails || loadingTotalSupply ? (
            <>
              <div className="flex flex-col" style={{ width: 80 }}>
                <div className="opacity-50">
                  <Spinner kind="simpleDotsScrolling" />
                </div>
                <div className="text-sm">
                  <Spinner kind="line" />
                </div>
              </div>
              <div className="flex flex-col opacity-50" style={{ width: 80 }}>
                <div className="opacity-50">
                  <Spinner kind="simpleDotsScrolling" />
                </div>
                <div className="text-sm">
                  <Spinner kind="line" />
                </div>
              </div>
              <div className="flex flex-col opacity-25" style={{ width: 80 }}>
                <div className="opacity-50">
                  <Spinner kind="simpleDotsScrolling" />
                </div>
                <div className="text-sm">
                  <Spinner kind="line" />
                </div>
              </div>
            </>
          ) : (
            <>
              {!!details?.marketCap?.usd && (
                <div className="flex flex-col items-center">
                  <div className="opacity-50">Market Cap</div>
                  <div className="text-sm">
                    {formatUsd(details?.marketCap?.usd)}
                  </div>
                </div>
              )}
              {!!details?.marketCap?.fdv && (
                <div className="flex flex-col items-center">
                  <div className="opacity-50">Fully Diluted Valuation</div>
                  <div className="text-sm">
                    {formatUsd(details?.marketCap?.fdv)}
                  </div>
                </div>
              )}
              {!!details?.supply?.circulatingSupply && (
                <div className="flex flex-col items-center">
                  <div className="opacity-50">Circulating Supply</div>
                  <div className="text-sm">
                    {formatCoin(
                      details?.supply?.circulatingSupply,
                      info?.symbol,
                    )}
                  </div>
                </div>
              )}
              {!!_totalSupply && (
                <div className="flex flex-col items-center">
                  <div className="opacity-50">Total Supply</div>
                  <div className="text-sm">
                    {formatCoin(_totalSupply, info?.symbol)}
                  </div>
                </div>
              )}
              {!!info?.decimals && (
                <div className="flex flex-col items-center">
                  <div className="opacity-50">Decimals</div>
                  <div className="text-sm">{info?.decimals}</div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="divider"></div>

      <div className="content flex flex-col p-6">
        <div className="flex gap-6">
          <div className="w-2/4">
            <div
              style={{
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 2,
              }}
            >
              {mounted && (
                <TokenChartClient
                  chart={pair?.chart || []}
                  loadingChart={loadingPair}
                  height={400}
                />
              )}
            </div>

            <div className="pair-grid gap-y-2 gap-x-4 grid pt-4">
              {pairs &&
                pairs.map((pair: any, i: number) => (
                  <PairRow key={pair?.pair?.address} i={i} pair={pair} />
                ))}
            </div>
          </div>

          <div className="w-2/4">
            <div className="flex">
              <div className="tag tag--large">
                <Icon kind="star-small" />
                TOP POOL
              </div>
            </div>
            <div className="pt-2 pb-1 text-sm">
              <span>{topPoolSymbol}</span>
            </div>

            <div className="">
              <div className="flex flex-col pt-1">
                <div className="flex">
                  <div className="opacity-50 grow">Price</div>
                  <div>{price}</div>
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <div className="flex">
                  <div className="opacity-50 grow">Liquidity</div>
                  <div>{liquidity}</div>
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <div className="flex">
                  <div className="opacity-50 grow">Volume 24H</div>
                  <div>{volume24h}</div>
                </div>
              </div>
              <div className="flex flex-col pt-1">
                <div className="flex">
                  <div className="opacity-50 grow">Transactions 24H</div>
                  <div>{txnCount24h}</div>
                </div>
              </div>
            </div>

            <div className="py-4">
              <div className="divider"></div>
            </div>

            <div className="pb-1 text-sm">
              <span className="opacity-75">General Statistics</span>
            </div>

            <div className="">
              {details?.stats24h?.high && (
                <div className="flex flex-col py-1">
                  <div className="flex">
                    <div className="opacity-50 grow">24H High</div>
                    <div>{formatUsd(details?.stats24h?.high)}</div>
                  </div>
                </div>
              )}
              {details?.stats24h?.low && (
                <div className="flex flex-col py-1">
                  <div className="flex">
                    <div className="opacity-50 grow">24H Low</div>
                    <div>{formatUsd(details?.stats24h?.low)}</div>
                  </div>
                </div>
              )}
              {details?.ath?.usd && (
                <div className="flex flex-col py-1">
                  <div className="flex">
                    <div className="opacity-50 grow">All-time High</div>
                    <div>
                      {formatUsd(details?.ath?.usd)} ({details?.ath?.percentage}
                      %)
                    </div>
                  </div>
                </div>
              )}
              {details?.atl?.usd && (
                <div className="flex flex-col py-1">
                  <div className="flex">
                    <div className="opacity-50 grow">All-time Low</div>
                    <div>
                      {formatUsd(details?.atl?.usd)} ({details?.atl?.percentage}
                      %)
                    </div>
                  </div>
                </div>
              )}

              {details?.marketCap?.rank && (
                <div className="flex flex-col py-1">
                  <div className="flex">
                    <div className="opacity-50 grow">CoinGecko Rank</div>
                    <div>#{details?.marketCap?.rank}</div>
                  </div>
                </div>
              )}
            </div>

            {details?.description && (
              <>
                <div className="py-4">
                  <div className="divider"></div>
                </div>

                <div className="flex flex-col gap-1 whitespace-pre-wrap">
                  <div className="text-sl opacity-50">Description</div>
                  {details?.description}
                </div>

                <div className="py-4">
                  <div className="divider"></div>
                </div>
              </>
            )}

            {details?.links?.website && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Website</div>
                  <a href={details?.links?.website}>{details?.links?.website}</a>
                </div>
              </div>
            )}
            {details?.links?.twitter && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Twitter</div>
                  <a href={details?.links?.twitter}>{details?.links?.twitter}</a>
                </div>
              </div>
            )}
            {details?.links?.discord && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Discord</div>
                  <a href={details?.links?.discord as string}>{details?.links?.discord}</a>
                </div>
              </div>
            )}
            {details?.links?.telegram && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Telegram</div>
                  <a href={details?.links?.telegram}>{details?.links?.telegram}</a>
                </div>
              </div>
            )}
            {details?.links?.reddit && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Reddit</div>
                  <a href={details?.links?.reddit}>{details?.links?.reddit}</a>
                </div>
              </div>
            )}
            {details?.links?.repo && (
              <div className="flex flex-col py-1">
                <div className="flex">
                  <div className="opacity-50 grow">Repository</div>
                  <a href={details?.links?.repo as string}>{details?.links?.repo}</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
