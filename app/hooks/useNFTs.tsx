import { useSearchParams } from '@remix-run/react';
import { useInfiniteQuery } from 'react-query';

export default function useNFTs(address: string): any {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&cursor=${encodeURIComponent(
          pageParam,
        )}&${searchParams.toString()}`
      : `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&${searchParams.toString()}`;

    return fetch(url).then((res) => res.json());
  };

  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: `nft-pages:${address}:${searchParams.toString()}`,
    queryFn: fetcher,
    staleTime: Infinity,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.cursor;
    },
  }) as any;

  return {
    data,
    error,
    loading: isLoading,
    fetching: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
