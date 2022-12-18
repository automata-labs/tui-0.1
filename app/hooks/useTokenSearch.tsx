import { useQuery } from 'react-query';

export default function useTokenSearch(search: string) {
  let url = search
    ? `https://api-nijynot.vercel.app/api/search/tokens?query=${encodeURIComponent(
        search,
      )}`
    : `https://api-nijynot.vercel.app/api/trending/tokens`;

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `search-tokens:${search}`,
    queryFn: () => fetch(url).then((res) => res.json()),
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }) as any;

  return {
    tokens: data ?? [],
    loading: isLoading || isFetching,
  };
}
