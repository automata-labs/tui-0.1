import { useQuery } from '@tanstack/react-query';

export default function useTokenChart(address: string, interval: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/token/chart?address=${address}&interval=${interval}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`token-chart:${address}+${interval}`],
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    data,
    loading: isLoading || isFetching,
  };
}
