import { useQuery } from '@tanstack/react-query';

export default function usePairInfo(address: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/token/pair/info?address=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`pair-info:${address}`],
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
