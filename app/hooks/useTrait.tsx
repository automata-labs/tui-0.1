import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery } from 'react-query';

import useTraits from './useTraits';

function useTraitInternal(address: string, key: string) {
  const { data, loading } = useTraits(address);
  const trait = data.find((trait: any) => trait.key === key) || [];

  return { data: trait, loading };
}

function useRange(address: string, key: string, enabled: boolean) {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/collection/traits/range?id=${address}&trait=${key}&limit=21&offset=${pageParam}`
      : `https://api-nijynot.vercel.app/api/collection/traits/range?id=${address}&trait=${key}&limit=21`;

    return fetch(url).then((res) => res.json());
  };

  const offset = useRef(0);
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: `collection:traits:range:${address}+${key}`,
      queryFn: fetcher,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      getNextPageParam: (lastPage: any) => {
        return (lastPage.length > 20) ? offset.current : undefined;
      },
      enabled,
    });

  return {
    data: {
      key,
      kind: 'range',
      values: data?.pages.reduce((state, current) => {
        return state.concat(current);
      }, []),
    },
    loading: isLoading,
    fetching: isFetchingNextPage,
    hasNextPage,
    fetchNextPage: () => {
      offset.current += 20;
      fetchNextPage();
    },
  };
}

export default function useTrait(address: string, key: string) {
  const [shouldFetchRange, setShouldFetchRange] = useState(false);

  const { data: data0, loading: loading0 } = useTraitInternal(address, key);
  const {
    data: data1,
    loading: loading1,
    fetching,
    hasNextPage,
    fetchNextPage,
  } = useRange(address, key, shouldFetchRange);

  useEffect(() => {
    if (
      Number.isInteger(data0?.maxRange) &&
      Number.isInteger(data0?.minRange)
    ) {
      setShouldFetchRange(true);
    }
  }, [data0.length]);

  if (data0?.values) {
    return { data: data0, loading: loading0 };
  }

  if (data1) {
    return {
      data: data1,
      loading: loading1,
      fetching,
      hasNextPage,
      fetchNextPage,
    };
  }

  return {};
}
