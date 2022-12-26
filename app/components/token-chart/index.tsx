import { Axis, LineSeries, Tooltip, XYChart } from '@visx/xychart';
import { DateTime } from 'luxon';

import Skeleton from './skeleton';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function TokenChart({
  height,
  chart,
  loading,
  setPrice,
  setDate,
}: any) {
  const min = Math.min(...chart.map((v: any) => v.y));
  const max = Math.max(...chart.map((v: any) => v.y));
  const room = (max - min) * 0.075;

  return loading ? (
    <Skeleton height={height} />
  ) : (
    <div style={{ overflow: 'hidden' }}>
      <XYChart
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        height={height}
        xScale={{ type: 'band' }}
        yScale={{
          type: 'linear',
          domain: [min - room, max + room],
          zero: false,
        }}
        onPointerMove={(e: any) => {
          setPrice && setPrice(e?.datum?.y);
          setDate && setDate(e?.datum?.x);
        }}
        onPointerOut={() => {
          setPrice && setPrice(null);
          setDate && setDate(null);
        }}
      >
        <Axis
          orientation="bottom"
          stroke={'transparent'}
          strokeWidth={1}
          tickStroke={'transparent'}
          tickFormat={(v) => DateTime.fromSeconds(v).toFormat('d LLL')}
          tickLabelProps={() =>
            ({
              fill: 'rgba(255, 255, 255, 0.5)',
              fontSize: 10,
              fontFamily: 'ABC Diatype Mono Unlicensed Trial',
              dy: -24,
            } as const)
          }
        />
        <Axis
          orientation="right"
          stroke={'transparent'}
          strokeWidth={1}
          numTicks={7}
          tickStroke={'transparent'}
          tickLabelProps={() =>
            ({
              fill: 'rgba(255, 255, 255, 0.5)',
              fontSize: 10,
              fontFamily: 'ABC Diatype Mono Unlicensed Trial',
              textAnchor: 'end',
              dx: -10,
            } as const)
          }
        />
        <LineSeries
          color="white"
          dataKey="Line 1"
          data={chart}
          style={{ stroke: 'white', strokeWidth: 1 }}
          xAccessor={(d: any) => d.x}
          yAccessor={(d: any) => Number(d.y)}
        />
        <Tooltip
          applyPositionStyle
          showHorizontalCrosshair
          showVerticalCrosshair
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          detectBounds
          style={{ border: 0, padding: 0 }}
          horizontalCrosshairStyle={{
            strokeWidth: 1,
            stroke: 'rgba(255, 255, 255, 0.2)',
          }}
          verticalCrosshairStyle={{
            strokeWidth: 1,
            stroke: 'rgba(255, 255, 255, 0.2)',
          }}
          renderGlyph={() => {
            return <>{/* <Icon kind="chart-asterisk" /> */}</>;
          }}
          renderTooltip={() => {
            return <></>;
          }}
        />
        <Tooltip
          applyPositionStyle
          snapTooltipToDatumX
          snapTooltipToDatumY
          showSeriesGlyphs
          detectBounds
          style={{
            border: 0,
            padding: 0,
            background: 'red',
          }}
          renderGlyph={() => {
            return <></>;
          }}
          renderTooltip={() => {
            return <></>;
          }}
        />
      </XYChart>
    </div>
  );
}
