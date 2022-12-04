import { useQuery } from 'react-query';

export default function useNFTSearch(search: string) {
  let url = search
    ? `https://api-nijynot.vercel.app/api/search/nfts?query=${encodeURIComponent(search)}`
    : `https://api-nijynot.vercel.app/api/trending/nfts`;
  let options = {
    headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
  };

  return useQuery(`search:${search}`, () => {
    return fetch(url, options).then((res) => res.json());
  }) as any;
}
