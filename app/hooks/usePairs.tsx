import { useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

export default function useRange(address: string) {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/token/pairs?address=${address}&limit=15&cursor=${pageParam}`
      : `https://api-nijynot.vercel.app/api/token/pairs?address=${address}&limit=15`;

    return fetch(url).then((res) => res.json());
  };

  const offset = useRef(0);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: `pairs:${address}`,
      queryFn: fetcher,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage: any) => {
        return lastPage.length > 20 ? offset.current : undefined;
      },
    });

  return {
    data: data?.pages.reduce((state, current) => {
      return state.concat(current);
    }, []),
    loading: isLoading,
    fetching: isFetchingNextPage,
    hasNextPage,
    fetchNextPage: () => {
      offset.current += 20;
      fetchNextPage();
    },
  };
}
