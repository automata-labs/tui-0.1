import { useQuery } from 'react-query';

export default function useTraits(id: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/collection/traits?id=${id}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `collection:traits:${id}`,
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    data: data ?? [],
    loading: isLoading || isFetching,
  };
}
