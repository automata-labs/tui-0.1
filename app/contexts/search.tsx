import { useDebouncedState } from '@react-hookz/web';
import React, { useContext, useEffect, useState } from 'react';

import useBlockSearch from '~/hooks/useBlockSearch';
import useCollectionsSearch from '~/hooks/useCollectionsSearch';
import useTokenSearch from '~/hooks/useTokenSearch';

export const SearchContext = React.createContext({});

type SearchProviderProps = {
  children: React.ReactNode;
};

export function SearchProvider({ children }: SearchProviderProps) {
  const [search, setSearch] = useDebouncedState('', 75, 0);
  const [index, setIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState({}) as any;

  const { blocks, match } = useBlockSearch(search);
  const { tokens, loading: loadingTokens } = useTokenSearch(search);
  const { collections, loading: loadingCollections } =
    useCollectionsSearch(search);

  const getIdentifier = (value: any) => {
    if (value?.type === 'block') {
      return { type: 'block', number: value?.number };
    } else if (value?.type === 'token') {
      return { type: 'token', address: value?.address };
    } else if (value?.type === 'collection') {
      return { type: 'collection', id: value?.id };
    }

    return {};
  };

  const getIndexToSelected = (value: number) => {
    const results = [...blocks, ...tokens, ...collections];
    const current = results[value];

    if (current?.type === 'block') {
      return { type: 'block', number: current?.number, to: `/block/${current?.number}` };
    } else if (current?.type === 'token') {
      return { type: 'token', address: current?.address, to: `/token/${current?.address}` };
    } else if (current?.type === 'collection') {
      return { type: 'collection', id: current?.id, to: `/collection/${current?.id}` };
    }

    return {};
  };

  const getSelectedToIndex = (value: any) => {
    if (!selected?.type) {
      return null;
    }

    const results = [...blocks, ...tokens, ...collections];

    if (selected?.type === 'block') {
      return results.findIndex(
        (element) =>
          element.type === selected?.type && element.number === selected?.number
      );
    }

    if (selected?.type === 'token') {
      return results.findIndex(
        (element) =>
          element.type === selected?.type && element.address === selected?.address
      );
    }

    if (selected?.type === 'collection') {
      return results.findIndex(
        (element) =>
          element.type === selected?.type && element.id === selected?.id
      );
    }

    return null;
  };

  const select = (value: any) => {
    if (value === null) {
      setSelected({});
      setIndex(null);
    } else if (typeof value === 'number') {
      setSelected(getIndexToSelected(value));
      setIndex(value);
    } else if (value && value.type) {
      setSelected(value);
      setIndex(getSelectedToIndex(value));
    }
  };

  const increment = () => {
    const total = [...blocks, ...tokens, ...collections].length;

    if (typeof index === 'number') {
      setSelected(getIndexToSelected((index + 1) % total));
      setIndex((index + 1) % total);
    } else {
      setSelected(getIndexToSelected(0));
      setIndex(0);
    }
  };

  const decrement = () => {
    let nextSelected;
    let nextIndex;

    const total = [...blocks, ...tokens, ...collections].length;

    if (typeof index === 'number') {
      if (index === 0) {
        nextSelected = getIndexToSelected(Math.max(total - 1, 0));
        nextIndex = Math.max(total - 1, 0);
      } else {
        nextSelected = getIndexToSelected(index - 1);
        nextIndex = index - 1;
      }
    } else {
      nextSelected = getIndexToSelected(Math.max(total - 1, 0));
      nextIndex = Math.max(total - 1, 0);
    }

    setSelected(nextSelected);
    setIndex(nextIndex);
  };

  useEffect(() => {
    if (!loadingTokens && !loadingCollections) {
      select(0);
    }
  }, [loadingTokens, loadingCollections]);

  console.log(index, selected);

  return (
    <SearchContext.Provider
      value={{
        search,
        setSearch,
        index,
        setIndex,
        selected,
        setSelected,
        blocks,
        match,
        tokens,
        loadingTokens,
        collections,
        loadingCollections,
        select,
        increment,
        decrement,
        getIdentifier,
        getSelectedToIndex,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error('`useSearch` must be within a SearchProvider');
  }

  return context;
}
