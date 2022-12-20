import { useQuery } from 'react-query';

export default function usePairDetails(address: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/token/pair/events?address=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `pair-events:${address}`,
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
