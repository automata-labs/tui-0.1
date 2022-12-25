import { useQuery } from '@tanstack/react-query';

export default function useTokenTotalSupply(address: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/token/total-supply?address=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`token-total-supply:${address}`],
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
