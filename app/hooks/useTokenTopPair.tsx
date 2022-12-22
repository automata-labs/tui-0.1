import { useQuery } from 'react-query';

export default function useTokenTopPair(address: string, range?: string) {
  const fetcher = () => {
    return fetch(
      range
        ? `https://api-nijynot.vercel.app/api/token/pair/top?address=${address}&range=${range}`
        : `https://api-nijynot.vercel.app/api/token/pair/top?address=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `token-top-pair:${address}`,
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
