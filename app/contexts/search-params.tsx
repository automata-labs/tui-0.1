import { useDeepCompareEffect } from '@react-hookz/web';
import { useLocation, useSubmit } from '@remix-run/react';
import React, { useContext, useState } from 'react';

export const SearchParamsContext = React.createContext({});

type SearchParamsProviderProps = {
  children: React.ReactNode;
};

export function SearchParamsProvider({ children }: SearchParamsProviderProps) {
  const [searchParams, setSearchParams] = useState({});

  const location = useLocation();
  const submit = useSubmit();

  useDeepCompareEffect(() => {
    submit(new URLSearchParams(searchParams), { replace: true, action: location.pathname });
  }, [searchParams]);

  return (
    <SearchParamsContext.Provider
      value={{
        searchParams,
        setSearchParams,
      }}
    >
      {children}
    </SearchParamsContext.Provider>
  );
}

export function useSearchParamsContext() {
  const context = useContext(SearchParamsContext);

  if (context === undefined) {
    throw new Error(
      '`useSearchParamsContext` must be within a SearchParamsProvider'
    );
  }

  return context;
}
