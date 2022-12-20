import { useParams, useSearchParams } from '@remix-run/react';
import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import Icon from '~/components/icon';
import PairEvent, { links as pairEventLinks } from '~/components/pair-event';
import Spinner from '~/components/spinner';
import TokenChart from '~/components/token-chart';
import TokenIcon, { links as tokenIconLinks } from '~/components/token-icon';
import usePairDetails from '~/hooks/usePairDetails';
import usePairEvents from '~/hooks/usePairEvents';
import usePairInfo from '~/hooks/usePairInfo';
import useTokenChart from '~/hooks/useTokenChart';
import stylesheet from '~/styles/pair.css';
import { getExchange } from '~/utils/constants';

export function links() {
  return [
    ...pairEventLinks(),
    ...tokenIconLinks(),
    { rel: 'stylesheet', href: stylesheet },
  ];
}

export const handle = {
  breadcrumb: (_: any, key: number) => <Breadcrumb key={key} />,
};

function Breadcrumb() {
  const { address } = useParams() as any;
  const { data: info, loading } = usePairInfo(address) as any;

  return (
    <>
      <Icon kind="slash" />
      <div className="breadcrumb-text">
        {loading && <Spinner kind="simpleDotsScrolling" />}
        {!loading && `${info?.token0?.symbol}/${info?.token1?.symbol}`}
      </div>
    </>
  );
}

export default function Pair() {
  const { address } = useParams() as any;
  const [searchParams, setSearchParams] = useSearchParams();
  const [ref, { entry }] = useIntersectionObserver();

  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);
  const range = searchParams.get('range') || '1W';

  const { data: info, loading: infoLoading } = usePairInfo(address) as any;
  const { data: details } = usePairDetails(address) as any;
  const {
    data: events,
    fetching,
    fetchNextPage,
    hasNextPage,
  } = usePairEvents(address) as any;
  const { data: chart } = useTokenChart(address, range) as any;

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage]);

  function handleRange(range: string) {
    searchParams.set('range', range);
    setSearchParams(searchParams, { replace: true });
  }

  return (
    <main className="page page--dual">
      <div className="main">
        <div className="pair-chart">
          {chart && (
            <TokenChart chart={chart} setPrice={setPrice} setDate={setDate} />
          )}
        </div>

        <div className="pair-chart-intervals pad">
          {['1D', '1W', '1M', '3M', '6M', '1Y'].map((value: string) => (
            <button
              key={value}
              className={clsx(
                'button button--text button--option pair-chart-interval',
                value === range && 'active',
              )}
              onClick={() => handleRange(value)}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="pair-events">
          <div
            className="head"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            Type
          </div>
          <div
            className="head"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            $
          </div>
          <div
            className="head"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            Token
          </div>
          <div
            className="head"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            Price
          </div>
          <div
            className="head cell--end"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            Maker
          </div>
          <div
            className="head cell--end"
            style={{
              gridRow: 1,
              position: 'sticky',
              top: 0,
              background: 'black',
            }}
          >
            Age
          </div>
          <div
            style={{ gridRow: 2, position: 'sticky', top: 44 }}
            className="divider divider--grid"
          ></div>

          {events &&
            info &&
            events?.map((event: any, i: number) => (
              <PairEvent
                key={i}
                i={i + 1}
                token0={info?.token0}
                token1={info?.token1}
                event={event}
                tokenOfInterest={details?.tokenOfInterest}
              />
            ))}

          {hasNextPage && (
            <div ref={ref} style={{ gridColumn: '1 / -1', padding: 10 }}>
              <div className="terminal-load-more-area center">
                {fetching && <Spinner kind="simpleDotsScrolling" />}
                {!fetching && hasNextPage && (
                  <button
                    className="button button--fullscreen"
                    onClick={fetchNextPage}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="side">
        <div className="pair-name">
          {info?.token0?.symbol}/{info?.token1?.symbol}
        </div>
        <div className="pair-price">
          ${price ? price : chart && chart[chart?.length - 1]?.y}
        </div>
        <div className="pair-date">
          {date && `@${DateTime.fromSeconds(date).toLocal().toFormat('DD, t')}`}
        </div>

        <div className="side-group">
          <div className="side-group-key side-group-key--tokens">Tokens</div>
          <TokenIcon
            image={info?.token0?.logo}
            text={<div>{info?.token0?.name}</div>}
            loading={infoLoading}
          />
          <div style={{ paddingBottom: 6 }}></div>
          <TokenIcon
            image={info?.token1?.logo}
            text={<div>{info?.token1?.name}</div>}
            loading={infoLoading}
          />
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Address</div>
          <div className="side-group-value">{info?.address}</div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Exchange</div>
          <div className="side-group-value">{getExchange(info?.exchange)}</div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Version</div>
          <div className="side-group-value">{info?.version}</div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Fee</div>
          <div className="side-group-value">{info?.fee}</div>
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Price 12H</div>
          <div className="side-group-value">
            {BigNumber(details?.stats12h?.usd?.close?.change)
              .multipliedBy(100)
              .dp(4)
              .toString()}
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1D</div>
          <div className="side-group-value">
            {BigNumber(details?.stats1d?.usd?.close?.change)
              .multipliedBy(100)
              .dp(4)
              .toString()}
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1W</div>
          <div className="side-group-value">
            {BigNumber(details?.stats1w?.usd?.close?.change)
              .multipliedBy(100)
              .dp(4)
              .toString()}
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1M</div>
          <div className="side-group-value">
            {BigNumber(details?.stats1m?.usd?.close?.change)
              .multipliedBy(100)
              .dp(4)
              .toString()}
            %
          </div>
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Volume 12H</div>
          <div className="side-group-value">
            ${details?.stats12h?.usd?.volume?.currentValue} (
            {BigNumber(details?.stats12h?.usd?.volume?.change)
              .multipliedBy(100)
              .dp(2)
              .toString()}
            %)
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1D</div>
          <div className="side-group-value">
            ${details?.stats1d?.usd?.volume?.currentValue} (
            {BigNumber(details?.stats1d?.usd?.volume?.change)
              .multipliedBy(100)
              .dp(2)
              .toString()}
            %)
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1W</div>
          <div className="side-group-value">
            ${details?.stats1w?.usd?.volume?.currentValue} (
            {BigNumber(details?.stats1w?.usd?.volume?.change)
              .multipliedBy(100)
              .dp(2)
              .toString()}
            %)
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1M</div>
          <div className="side-group-value">
            ${details?.stats1m?.usd?.volume?.currentValue} (
            {BigNumber(details?.stats1m?.usd?.volume?.change)
              .multipliedBy(100)
              .dp(2)
              .toString()}
            %)
          </div>
        </div>

        <div className="divider divider--side"></div>
      </div>
    </main>
  );
}
