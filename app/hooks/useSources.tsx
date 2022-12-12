import { useQuery } from 'react-query';

export default function useSources(id?: string) {
  const fetcher = () => {
    return fetch(
      `https://api-nijynot.vercel.app/api/collection/sources?id=${id}`
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `collection:sources:${id}`,
    queryFn: fetcher,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return {
    data: data ? data.filter((value: any) => value.source !== 'sudoswap.xyz') : [],
    loading: isLoading || isFetching,
  };
}
