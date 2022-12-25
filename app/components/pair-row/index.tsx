import { Link } from '@remix-run/react';
import { useState } from 'react';
import { formatUsd } from '~/utils/fmt';

import PairIcon, { links as pairIconLinks } from '../pair-icon';
import styles from './styles.css';

export const links = () => [
  ...pairIconLinks(),
  { rel: 'stylesheet', href: styles },
];

export default function PairRow({ pair, i }: any) {
  const [show, setShow] = useState(false);

  const j = (i + 1) * 2 - 1;
  const k = (i + 1) * 2;

  return (
    <>
      <Link
        to={`/pair/${pair?.pair?.address}`}
        className="pair-row-hoverable"
        style={{ gridRow: j }}
        onMouseOver={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >
        <div className="pair-row-overlay">
          <span>View Pool →</span>
        </div>
      </Link>

      <div style={{ gridColumn: 1, gridRow: j }}>
        <PairIcon token0={pair?.token0} token1={pair?.token1} />
      </div>
      <div className="flex flex-col" style={{ gridColumn: 2, gridRow: j }}>
        <span>
          {pair?.token0?.symbol}/{pair?.token1?.symbol}
          {pair?.pair?.fee && (
            <span className="tag ml-1">{pair?.pair?.fee / 10000}%</span>
          )}
        </span>
        <span className="opacity-50">{pair?.exchange?.name}</span>
      </div>
      <div
        className="flex flex-col"
        style={{ gridColumn: 3, gridRow: j, alignItems: 'flex-end' }}
      >
        <span>{formatUsd(pair?.liquidity)}</span>
        <span className="opacity-50">Liquidity</span>
      </div>
      <div
        className="flex flex-col"
        style={{ gridColumn: 4, gridRow: j, alignItems: 'flex-end' }}
      >
        <span>{formatUsd(pair?.volumeUSD24)}</span>
        <span className="opacity-50">Volume 24H</span>
      </div>

      <div
        className="divider"
        style={{ gridColumn: '1 / -1', gridRow: k }}
      ></div>
    </>
  );
}
