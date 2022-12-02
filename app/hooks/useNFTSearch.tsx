import { useQuery } from 'react-query';

export default function useNFTSearch(search: string) {
  let encoded = encodeURIComponent(search);
  let url = search
    ? `https://api.reservoir.tools/search/collections/v1?name=${encoded}&limit=4`
    : `https://api.reservoir.tools/collections/v5?sortBy=1DayVolume&limit=4&normalizeRoyalties=false&includeTopBid=false`;
  let options = {
    headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
  };

  return useQuery(`search:${search}`, () => {
    return fetch(url, options).then((res) => res.json());
  }) as any;
}
