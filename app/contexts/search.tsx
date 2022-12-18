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
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');
  const [query, setQuery] = useDebouncedState('', 75, 0);
  const [index, setIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState({}) as any;

  const { blocks, match } = useBlockSearch(query);
  const { tokens, loading: loadingTokens } = useTokenSearch(query);
  const { collections, loading: loadingCollections } =
    useCollectionsSearch(query);

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
      return {
        type: 'block',
        number: current?.number,
        to: `/block/${current?.number}`,
      };
    } else if (current?.type === 'token') {
      return {
        type: 'token',
        address: current?.address,
        to: `/token/${current?.address}`,
      };
    } else if (current?.type === 'collection') {
      return {
        type: 'collection',
        id: current?.id,
        to: `/collection/${current?.id}`,
      };
    }

    return {};
  };

  const getSelectedToIndex = (value: any) => {
    if (!value?.type) {
      return null;
    }

    const results = [...blocks, ...tokens, ...collections];

    if (value?.type === 'block') {
      return results.findIndex(
        (element) =>
          element.type === value?.type && element.number === value?.number,
      );
    }

    if (value?.type === 'token') {
      return results.findIndex(
        (element) =>
          element.type === value?.type && element.address === value?.address,
      );
    }

    if (value?.type === 'collection') {
      return results.findIndex(
        (element) => element.type === value?.type && element.id === value?.id,
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
      setIndex(getSelectedToIndex(value));
      setSelected(value);
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

  const open = () => {
    setVisible(true);
    select(0);
  };

  const close = () => {
    setVisible(false);
  };

  const reset = () => {
    setValue('');
    setQuery('');
  };

  useEffect(() => {
    if (!loadingTokens && !loadingCollections) {
      select(0);
    }
  }, [loadingTokens, loadingCollections]);

  return (
    <SearchContext.Provider
      value={{
        visible,
        setVisible,
        value,
        setValue,
        query,
        setQuery,
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
        open,
        close,
        reset,
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
