import { useQuery } from 'react-query';

export default function useCollection(address: string): any {
  const fetcher = () => {
    return fetch(
      `http://api-nijynot.vercel.app/api/collection/info?id=${address}`,
    ).then((res) => res.json());
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: `collection:${address}`,
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
