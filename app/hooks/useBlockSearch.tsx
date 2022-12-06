import _ from 'lodash';
import { useQuery } from 'react-query';

export default function useBlockSearch(number: string) {
  let url: string | null;
  const match = /^\d+$/.test(number);

  if (match) {
    url = `https://api-nijynot.vercel.app/api/blockchain/block?number=${number}`;
  }

  const { data, isLoading, isFetching } = useQuery(
    {
      queryKey: `useBlockSearch:${number}`,
      queryFn: () => {
        return (url)
         ? fetch(url).then((res) => res.json())
         : undefined;
      },
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  ) as any;

  return {
    match,
    blocks: _.isEmpty(data) ? [] : [data],
    loading: isLoading || isFetching,
  };
}
