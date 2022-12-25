import { useQuery } from '@tanstack/react-query';
import _ from 'lodash';

function twitterLink(handle: string) {
  if (handle) {
    return `https://twitter.com/${handle}`;
  }

  return null;
}

function websiteLink(homepage: Array<string>) {
  return _.head(homepage);
}

function discordLink(links: Array<string>) {
  const filtered = links.reduce((state: any, link) => {
    if (link.includes('discord.com') || link.includes('discord.gg')) {
      return [...state, link];
    }

    return state;
  }, []);

  return _.head(filtered);
}

function telegramLink(id: string) {
  if (id) {
    return `https://t.me/${id}`;
  }

  return null;
}

function redditLink(link: string) {
  return link ? link : null;
}

function repoLink(links: any) {
  if (_.head(links?.github)) {
    return _.head(links?.github)
  }

  if (_.head(links?.bitbucket)) {
    return _.head(links?.bitbucket)
  }

  return null;
}

export default function useTokenInfo(address: string) {
  const fetcher = () => {
    return fetch(
      `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}`,
    )
    .then((res) => res.json())
    .then((data) => {
      return {
        description: data?.description?.en,
        ath: {
          usd: data?.market_data?.ath?.usd,
          date: data?.market_data?.ath_date?.usd,
          percentage: data?.market_data?.ath_change_percentage?.usd,
        },
        atl: {
          usd: data?.market_data?.atl?.usd,
          date: data?.market_data?.atl_date?.usd,
          percentage: data?.market_data?.atl_change_percentage?.usd,
        },
        supply: {
          totalSupply: data?.market_data?.total_supply,
          maxSupply: data?.market_data?.max_supply,
          circulatingSupply: data?.market_data?.circulating_supply,
          lastUpdated: data?.market_data?.last_updated,
        },
        marketCap: {
          usd: data?.market_data?.market_cap?.usd,
          rank: data?.market_data?.market_cap_rank,
          fdv: data?.market_data?.fully_diluted_valuation?.usd,
        },
        stats24h: {
          high: data?.market_data?.high_24h?.usd,
          low: data?.market_data?.low_24h?.usd,
          change: data?.market_data?.price_change_24h,
          percentage: data?.market_data?.price_change_percentage_24h,
        },
        stats1w: {
          percentage: data?.market_data?.price_change_percentage_7d,
        },
        stats1m: {
          percentage: data?.market_data?.price_change_percentage_30d,
        },
        stats1y: {
          percentage: data?.market_data?.price_change_percentage_1y,
        },
        links: {
          website: websiteLink(data?.links?.homepage),
          twitter: twitterLink(data?.links?.twitter_screen_name),
          discord: discordLink(data?.links?.chat_url),
          telegram: telegramLink(data?.links?.telegram_channel_identifier),
          reddit: redditLink(data?.links?.subreddit_url),
          repo: repoLink(data?.links?.repos_url),
        },
      };
    });
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`token-details:${address}`],
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
