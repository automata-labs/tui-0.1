import { defer } from '@remix-run/node';
import { Await, useLoaderData, useParams } from '@remix-run/react';
import request, { gql } from 'graphql-request';
import { useInfiniteQuery } from 'react-query';
import type { LoaderFunction } from '@remix-run/node';
import { Suspense } from 'react';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';

const nftsPerPage = 30;

export const loader: LoaderFunction = async ({ params }) => {
  const variables = { address: params.address };
  const query = gql`
    query Collection($address: String!) {
      collection(address: $address) {
        address
        name
        image
        banner
      }
    }
  `;

  return defer({
    data: request('http://localhost:4001/graphql', query, variables),
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export default function Page() {
  const fetcher = (address: string) => {
    return ({ pageParam }: any) => {
      const url = pageParam
        ? `https://api.reservoir.tools/tokens/v5?collection=${address}&sortBy=floorAskPrice&sortDirection=asc&limit=${nftsPerPage}&continuation=${pageParam}`
        : `https://api.reservoir.tools/tokens/v5?collection=${address}&sortBy=floorAskPrice&sortDirection=asc&limit=${nftsPerPage}`;

      return fetch(url, {
        headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
      }).then((res) => res.json());
    };
  };

  const { address } = useParams() as any;
  const { data } = useLoaderData();
  const {
    data: nftData,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery(`/nft/${address}`, fetcher(address), {
    staleTime: Infinity,
    getNextPageParam: (lastPage) => {
      return lastPage?.continuation;
    },
  });

  const nfts = nftData?.pages?.reduce(
    (state: any, current: any) => state.concat(current.tokens),
    []
  );

  return (
    <main className="page">
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={data}>
          {(data) => {
            return (
              <>
                <div className="collection-header pad">
                  <div className="collection-image-wrapper">
                    <img
                      className="collection-image"
                      src={data?.collection?.image}
                      alt={data?.collection?.name}
                    />
                  </div>
                  <div className="collection-core">
                    <div>{data?.collection?.name}</div>
                    <div className="collection-core-address">{address}</div>
                  </div>

                  <Tabs>
                    <Tab to={`/nft/${address}`} label="OVERVIEW" />
                  </Tabs>
                </div>
                <div className="divider"></div>
              </>
            );
          }}
        </Await>
      </Suspense>

      {!error ? (
        <div className="nft-grid pad">
          {nfts?.map((nft: any, i: number) => (
            <NFT key={i} nft={nft?.token} />
          ))}

          {(isLoading || isFetchingNextPage) &&
            Array(nftsPerPage)
              .fill(0)
              .map((_, i) => (
                <div className="nft" key={`${Math.random()}:${i}`}>
                  <Spinner />
                </div>
              ))}
        </div>
      ) : (
        <div>error!</div>
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>load more!</button>
      )}
    </main>
  );
}
