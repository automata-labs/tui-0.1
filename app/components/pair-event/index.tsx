import clsx from 'clsx';
import { DateTime } from 'luxon';
import usePairEvent from '~/hooks/usePairEvent';
import { formatCoin, formatUsd } from '~/utils/fmt';
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

  if (event?.type === 'Sell' || event?.type === 'Buy') {
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
        <div className="cell" style={{ gridRow: n * 2 - 1 }}>
          {formatUsd(data?.total)}
        </div>
        <div className="cell" style={{ gridRow: n * 2 - 1 }}>
          {formatCoin(
            data?.amount,
            tokenOfInterest === 'token0' ? token0?.symbol : token1?.symbol,
          )}
        </div>
        <div className="cell" style={{ gridRow: n * 2 - 1 }}>
          {formatUsd(data?.price)}
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
  } else if (event?.type === 'Mint') {
    return (
      <>
        <div
          className={clsx('cell pair-event-type', 'mint')}
          style={{ gridRow: n * 2 - 1 }}
        >
          {event?.type}
        </div>
        <div
          className="cell"
          style={{ gridRow: n * 2 - 1, gridColumn: '2 / -3' }}
        >
          +{formatCoin(data?.lp0, token0?.symbol)}
          <span className="opacity-50"> and </span>
          +{formatCoin(data?.lp1, token1?.symbol)}
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
  } else if (event?.type === 'Burn') {
    return (
      <>
        <div
          className={clsx('cell pair-event-type', 'burn')}
          style={{ gridRow: n * 2 - 1 }}
        >
          {event?.type}
        </div>
        <div
          className="cell"
          style={{ gridRow: n * 2 - 1, gridColumn: '2 / -3' }}
        >
          -{formatCoin(data?.lp0, token0?.symbol)}
          <span className="opacity-50"> and </span>
          -{formatCoin(data?.lp1, token1?.symbol)}
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

  return (
    <>
      <div
        className={clsx(
          'cell pair-event-type',
          event?.type === 'Sell' && 'sell',
          event?.type === 'Buy' && 'buy',
        )}
        style={{ gridRow: n * 2 - 1, gridColumn: '1 / -2' }}
      >
        {event?.type}
      </div>
      <div className="cell cell--end" style={{ gridRow: n * 2 - 1 }}>
        {DateTime.fromSeconds(Number(event?.timestamp)).toRelative()}
      </div>
      <div className="divider divider--grid" style={{ gridRow: n * 2 }}></div>
    </>
  );
}
