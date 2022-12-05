import { useQuery } from 'react-query';

export default function useNFTSearch(search: string) {
  let url = search
    ? `https://api-nijynot.vercel.app/api/search/nfts?query=${encodeURIComponent(search)}`
    : `https://api-nijynot.vercel.app/api/trending/nfts`;

  return useQuery(
    `search-nfts:${search}`,
    () => {
      return fetch(url).then((res) => res.json());
    },
    {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  ) as any;
}
