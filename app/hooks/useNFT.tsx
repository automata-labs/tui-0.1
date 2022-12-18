import { useQuery } from 'react-query';

export default function useNFT(address: string, id: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/nft?address=${address}&id=${id}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `nft:${address}+${id}`,
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
