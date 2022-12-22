import { useParams, useSearchParams } from '@remix-run/react';
import { BigNumber } from 'bignumber.js';
import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import PairClient from '~/client/pair.client';
import TokenChartClient from '~/client/token-chart.client';
import Icon from '~/components/icon';
import { links as pairEventLinks } from '~/components/pair-event';
import Spinner from '~/components/spinner';
import Text from '~/components/text';
import { links as tokenChartLinks } from '~/components/token-chart';
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
    ...tokenChartLinks(),
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

  const [mounted, setMounted] = useState(false);
  const [price, setPrice] = useState(null);
  const [date, setDate] = useState(null);
  const range = searchParams.get('range') || '1W';

  const { data: info, loading: loadingInfo } = usePairInfo(address) as any;
  const { data: details, loading: loadingDetails } = usePairDetails(
    address,
  ) as any;
  const {
    data: events,
    fetching,
    fetchNextPage,
    hasNextPage,
  } = usePairEvents(address) as any;
  const { data: chart, loading: loadingChart } = useTokenChart(
    address,
    range,
  ) as any;

  useEffect(() => {
    setMounted(true);
  }, []);

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
        {mounted && (
          <TokenChartClient
            chart={chart}
            loadingChart={loadingChart}
            setPrice={setPrice}
            setDate={setDate}
          />
        )}
        {mounted && (
          <PairClient
            handleRange={handleRange}
            range={range}
            hasNextPage={hasNextPage}
            events={events}
            info={info}
            details={details}
            fetching={fetching}
            fetchNextPage={fetchNextPage}
            infiniteScrollRef={ref}
          />
        )}
      </div>

      <div className="side">
        <div className="pair-name">
          <Text
            loading={loadingDetails}
            kind="dotted"
            text={`${info?.token0?.symbol}/${info?.token1?.symbol}`}
          />
        </div>
        <div className="pair-price">
          ${price ? price : chart && chart[chart?.length - 1]?.y}
        </div>
        <div className="pair-date">
          {date && `@${DateTime.fromSeconds(date).toLocal().toFormat('DD, t')}`}
        </div>

        <div className="side-group side-group--no-margin">
          <div className="side-group-key side-group-key--tokens">Tokens</div>
          <TokenIcon
            image={info?.token0?.logo}
            text={<div>{info?.token0?.name}</div>}
            loading={loadingInfo}
          />
          <div style={{ paddingBottom: 6 }}></div>
          <TokenIcon
            image={info?.token1?.logo}
            text={<div>{info?.token1?.name}</div>}
            loading={loadingInfo}
          />
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Address</div>
          <div className="side-group-value">
            <Text
              loading={loadingInfo}
              kind="simpleDotsScrolling"
              text={info?.address}
            />
          </div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Exchange</div>
          <div className="side-group-value">
            <Text
              loading={loadingInfo}
              kind="simpleDotsScrolling"
              text={getExchange(info?.exchange)}
            />
          </div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Version</div>
          <div className="side-group-value">
            <Text
              loading={loadingInfo}
              kind="simpleDotsScrolling"
              text={info?.version}
            />
          </div>
        </div>
        <div className="side-group">
          <div className="side-group-key">Fee</div>
          <div className="side-group-value">
            <Text
              loading={loadingInfo}
              kind="simpleDotsScrolling"
              text={info?.fee}
            />
          </div>
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Price 12H</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={BigNumber(details?.stats12h?.usd?.close?.change)
                .multipliedBy(100)
                .dp(4)
                .toString()}
            />
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1D</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={BigNumber(details?.stats1d?.usd?.close?.change)
                .multipliedBy(100)
                .dp(4)
                .toString()}
            />
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1W</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={BigNumber(details?.stats1w?.usd?.close?.change)
                .multipliedBy(100)
                .dp(4)
                .toString()}
            />
            %
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Price 1M</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={BigNumber(details?.stats1m?.usd?.close?.change)
                .multipliedBy(100)
                .dp(4)
                .toString()}
            />
            %
          </div>
        </div>

        <div className="divider divider--side"></div>

        <div className="side-group">
          <div className="side-group-key">Volume 12H</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={
                <>
                  ${details?.stats12h?.usd?.volume?.currentValue} (
                  {BigNumber(details?.stats12h?.usd?.volume?.change)
                    .multipliedBy(100)
                    .dp(2)
                    .toString()}
                  %)
                </>
              }
            />
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1D</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={
                <>
                  ${details?.stats1d?.usd?.volume?.currentValue} (
                  {BigNumber(details?.stats1d?.usd?.volume?.change)
                    .multipliedBy(100)
                    .dp(2)
                    .toString()}
                  %)
                </>
              }
            />
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1W</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={
                <>
                  ${details?.stats1w?.usd?.volume?.currentValue} (
                  {BigNumber(details?.stats1w?.usd?.volume?.change)
                    .multipliedBy(100)
                    .dp(2)
                    .toString()}
                  %)
                </>
              }
            />
          </div>
        </div>

        <div className="side-group">
          <div className="side-group-key">Volume 1M</div>
          <div className="side-group-value">
            <Text
              loading={loadingDetails}
              kind="simpleDotsScrolling"
              text={
                <>
                  ${details?.stats1m?.usd?.volume?.currentValue} (
                  {BigNumber(details?.stats1m?.usd?.volume?.change)
                    .multipliedBy(100)
                    .dp(2)
                    .toString()}
                  %)
                </>
              }
            />
          </div>
        </div>

        <div className="divider divider--side"></div>
      </div>
    </main>
  );
}
