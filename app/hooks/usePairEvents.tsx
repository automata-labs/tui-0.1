import { useInfiniteQuery } from '@tanstack/react-query';

export default function usePairDetails(address: string) {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/token/pair/events?address=${address}&limit=50&cursor=${pageParam}`
      : `https://api-nijynot.vercel.app/api/token/pair/events?address=${address}&limit=50`;

    return fetch(url).then((res) => res.json());
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [`pair-events:${address}`],
      queryFn: fetcher,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage: any) => {
        return lastPage.cursor;
      },
    });

  return {
    data: data?.pages?.reduce((state, current) => {
      return state.concat(current?.items);
    }, []),
    loading: isLoading,
    fetching: isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  };
}
