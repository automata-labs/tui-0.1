import { withTooltip } from '@visx/tooltip';
import type { WithTooltipProvidedProps } from '@visx/tooltip/lib/enhancers/withTooltip';
import {
  LineSeries,
  Tooltip,
  TooltipProvider,
  XYChart,
  buildChartTheme,
} from '@visx/xychart';
import _ from 'lodash';
import { useCallback, useState } from 'react';
import styled from 'styled-components';

const Chart = styled.div`
  border: '1px solid red';
  overflow: hidden;
  min-width: 0;
`;

type ChartProps = {
  chart: any;
};

export default function TokenChart({ chart }: any) {
  const [data, setData] = useState({});
  // const [sign] = useChange(oldestPrice, latestPrice);

  // const customTheme = buildChartTheme({
  //   backgroundColor: 'transparent',
  //   // colors: [sign === '+' ? '#27AE60' : '#eb5757'],
  //   colors: ['white'],
  //   tickLength: 1,
  //   gridColor: 'rgba(255, 255, 255, 0.2)',
  //   gridColorDark: 'green',
  // });

  const accessors = {
    xAccessor: (d: any) => d.x,
    yAccessor: (d: any) => d.y,
  };

  const resetChart = () => {
    // setPrice((_.last(chart) as any)?.y);
    // setDate('');
  };

  console.log(data);

  const handleTooltip = useCallback((e: any) => {
    // console.log(e);
    // showTooltip({
    //   tooltipData: e.datum,
    //   tooltipLeft: e.svgPoint.x,
    // });
    // setDate(e.datum.x);
    // setPrice(e.datum.y);
  }, []);

  return (
    <Chart>
      <TooltipProvider hideTooltipDebounceMs={50}>
        <XYChart
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          // theme={customTheme}
          height={500}
          xScale={{ type: 'band' }}
          yScale={{
            type: 'linear',
            domain: [
              // increase domain relatively, so we get some padding on the chart
              Math.min(...chart.map((v: any) => v.y)),
              Math.max(...chart.map((v: any) => v.y)),
            ],
            zero: false,
          }}
          onPointerOut={() => resetChart()}
          onPointerMove={(e) => handleTooltip(e)}
        >
          <LineSeries
            color="white"
            dataKey="Line 1"
            data={chart}
            style={{
              stroke: 'white',
            }}
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
            glyphStyle={{
              r: 5,
              stroke: 'black',
              strokeWidth: 3,
              // fill: 'rgba(255, 255, 255, 1)',
              fill: '#ccc',
              className: 'chart-glyph',
            }}
            renderTooltip={(params) => {
              console.log(params);
              return (
                <div
                  style={{ top: 0 }}
                  // style={{ transform: `translateY(${params?.tooltipData?.nearestDatum?.distance}px)` }}
                >
                  date
                </div>
              );
            }}
          />
        </XYChart>
      </TooltipProvider>
    </Chart>
  );

  // return (
  //   <Chart>
  //     <TooltipProvider hideTooltipDebounceMs={50}>
  //       <XYChart
  //         margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
  //         theme={customTheme}
  //         height={250}
  //         xScale={{ type: 'band' }}
  //         yScale={{
  //           type: 'linear',
  //           domain: [
  //             Math.min(...chart.map((v: any) => v.y)),
  //             Math.max(...chart.map((v: any) => v.y)),
  //           ],
  //           zero: false,
  //         }}
  //         onPointerOut={() => resetChart()}
  //         onPointerMove={(e) => handleTooltip(e)}
  //       >
  //         <LineSeries
  //           color="white"
  //           dataKey="Line 1"
  //           data={chart}
  //           {...accessors}
  //         />
  //         <Tooltip
  //           applyPositionStyle
  //           showVerticalCrosshair
  //           snapTooltipToDatumX
  //           showSeriesGlyphs
  //           style={{ border: 0, padding: 0 }}
  //           glyphStyle={{
  //             r: 8,
  //             stroke: '#090909',
  //             strokeWidth: 3,
  //             className: 'chart-glyph',
  //           }}
  //           renderTooltip={() => <></>}
  //         />
  //       </XYChart>
  //     </TooltipProvider>
  //   </Chart>
  // );
  // }
}
