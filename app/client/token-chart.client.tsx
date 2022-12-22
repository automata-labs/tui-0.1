import { useWindowSize } from '@react-hookz/web';

import TokenChart from '~/components/token-chart';

export default function TokenChartClient({
  chart,
  loadingChart,
  setPrice,
  setDate,
  ratio,
  height,
}: any) {
  const size = useWindowSize();
  const detectHeight = size?.height * ((ratio || 45) / 100) || 500;

  return (
    <div style={{ height: height ?? detectHeight, backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
      {chart && (
        <TokenChart
          height={height ?? detectHeight}
          chart={chart}
          loading={loadingChart}
          setPrice={setPrice}
          setDate={setDate}
        />
      )}
    </div>
  );
}
