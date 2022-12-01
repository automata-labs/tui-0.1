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
        floorAsk
        topBid
        volume {
          allTime
        }
        tokenCount
        ownerCount
        onSaleCount
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
  }) as any;

  const nfts = nftData?.pages?.reduce(
    (state: any, current: any) => state.concat(current?.tokens),
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

                  <div className="collection-info">
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        FLOOR PRICE
                      </div>
                      <div className="collection-info-group-value">
                        Ξ{data?.collection?.floorAsk}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">TOP BID</div>
                      <div className="collection-info-group-value">
                        {data?.collection?.topBid
                          ? `Ξ${data?.collection?.topBid}`
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL VOLUME
                      </div>
                      <div className="collection-info-group-value">
                        {data?.collection?.volume?.allTime
                          ? `Ξ${data?.collection?.volume?.allTime}`
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL LISTED
                      </div>
                      <div className="collection-info-group-value">
                        {data?.collection?.onSaleCount
                          ? data?.collection?.onSaleCount
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL SUPPLY
                      </div>
                      <div className="collection-info-group-value">
                        {data?.collection?.tokenCount
                          ? data?.collection?.tokenCount
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL HOLDERS
                      </div>
                      <div className="collection-info-group-value">
                        {data?.collection?.ownerCount
                          ? data?.collection?.ownerCount
                          : '—'}
                      </div>
                    </div>
                  </div>

                  <Tabs>
                    <Tab to={`/nft/${address}`} label="ITEMS" />
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
            <NFT key={i} nft={nft?.token} market={nft?.market} />
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
