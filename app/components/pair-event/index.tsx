import BigNumber from 'bignumber.js';
import clsx from 'clsx';
import { DateTime } from 'luxon';
import usePairEvent from '~/hooks/usePairEvent';
import { shorten } from '~/utils/hex';

import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function PairEvent({
  i,
  token0,
  token1,
  event,
  tokenOfInterest,
}: any) {
  const { data } = usePairEvent(token0, token1, event, tokenOfInterest) as any;
  const n = i + 1;

  return (
    <>
      <div
        className={clsx(
          'cell pair-event-type',
          event?.type === 'Sell' && 'sell',
          event?.type === 'Buy' && 'buy',
        )}
        style={{ gridRow: n * 2 - 1 }}
      >
        {event?.type}
      </div>
      <div className="cell" style={{ gridRow: n * 2 - 1 }}>${data?.total}</div>
      <div className="cell" style={{ gridRow: n * 2 - 1 }}>
        {data?.amountOfInterest}{' '}
        {tokenOfInterest === 'token0' ? token0?.symbol : token1?.symbol}
      </div>
      <div className="cell" style={{ gridRow: n * 2 - 1 }}>
        $
        {tokenOfInterest === 'token0'
          ? BigNumber(event?.token0Price).dp(4).toString()
          : BigNumber(event?.tokenPrice).dp(4).toString()}
      </div>
      <div className="cell cell--end" style={{ gridRow: n * 2 - 1 }}>
        {shorten(event?.maker)}
      </div>
      <div className="cell cell--end" style={{ gridRow: n * 2 - 1 }}>
        {DateTime.fromSeconds(Number(event?.timestamp)).toRelative()}
      </div>
      <div className="divider divider--grid" style={{ gridRow: n * 2 }}></div>
    </>
  );
}
