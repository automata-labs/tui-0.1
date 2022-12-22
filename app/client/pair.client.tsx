import { useWindowSize } from '@react-hookz/web';
import clsx from 'clsx';
import PairEvent from '~/components/pair-event';
import Spinner from '~/components/spinner';

export default function PairClient({
  handleRange,
  range,
  hasNextPage,
  events,
  info,
  details,
  fetching,
  fetchNextPage,
  infiniteScrollRef,
}: any) {
  return (
    <>
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

      {events && (
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

          {info &&
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
            <div
              ref={infiniteScrollRef}
              style={{ gridColumn: '1 / -1', padding: 10 }}
            >
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
      )}
    </>
  );
}
