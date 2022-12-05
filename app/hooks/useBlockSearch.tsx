import { useQuery } from 'react-query';

export default function useBlockSearch(number: string) {
  let url: string | null;
  const match = /^\d+$/.test(number);

  if (match) {
    url = `https://api-nijynot.vercel.app/api/blockchain/block?number=${number}`;
  }

  return [match, useQuery(
    `search-blocks:${number}`,
    () => {
      if (url) {
        return fetch(url).then((res) => res.json());
      }

      return undefined;
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  ) as any];
}
