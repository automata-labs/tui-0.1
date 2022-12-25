import { useQuery } from '@tanstack/react-query';

export default function useCollectionsSearch(search: string) {
  let url = search
    ? `https://api-nijynot.vercel.app/api/search/nfts?query=${encodeURIComponent(
        search,
      )}`
    : `https://api-nijynot.vercel.app/api/trending/nfts`;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`useCollectionsSearch:${search}`],
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }) as any;

  return {
    collections: data ?? [],
    loading: isLoading || isFetching,
  };
}
