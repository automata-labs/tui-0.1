import { useWindowSize } from '@react-hookz/web';
import { LineSeries, Tooltip, XYChart } from '@visx/xychart';

import Icon from './icon';

export default function TokenChart({ chart, setPrice, setDate }: any) {
  const size = useWindowSize();

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => Number(d.y),
  };

  const min = Math.min(...chart.map((v: any) => v.y));
  const max = Math.max(...chart.map((v: any) => v.y));
  const room = (max - min) * 0.05;

  return (
    <XYChart
      margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
      height={size?.height * (45 / 100)}
      xScale={{ type: 'band' }}
      yScale={{
        type: 'linear',
        domain: [min - room, max + room],
        zero: false,
      }}
      onPointerMove={(e: any) => {
        setPrice(e?.datum?.y);
        setDate(e?.datum?.x);
      }}
      onPointerOut={() => {
        setPrice(null);
        setDate(null);
      }}
    >
      <LineSeries
        color="white"
        dataKey="Line 1"
        data={chart}
        style={{ stroke: 'white', strokeWidth: 1 }}
        {...accessors}
      />
      <Tooltip
        applyPositionStyle
        showVerticalCrosshair
        snapTooltipToDatumX
        snapTooltipToDatumY
        showSeriesGlyphs
        detectBounds
        style={{ border: 0, padding: 0 }}
        verticalCrosshairStyle={{
          strokeWidth: 1,
          stroke: 'rgba(255, 255, 255, 0.2)',
        }}
        renderGlyph={() => <Icon kind="chart-asterisk" />}
        renderTooltip={() => {
          return <></>;
        }}
      />
    </XYChart>
  );
}
