import { useQuery } from '@tanstack/react-query';

export default function useTokenInfo(address: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/token/info?address=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`token-info:${address}`],
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
