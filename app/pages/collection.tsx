import { defer } from '@remix-run/node';
import { Await, useLoaderData, useParams } from '@remix-run/react';
import request, { gql } from 'graphql-request';
import { useInfiniteQuery, useQuery } from 'react-query';
import type { LoaderFunction } from '@remix-run/node';
import { Suspense } from 'react';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';
import Filter from '~/components/filter';
import { useLauncher } from '~/contexts/launcher';
import Breadcrumb from '~/components/breadcrumb';
import Image from '~/components/image';

const nftsPerPage = 30;

export const loader: LoaderFunction = async ({ params }) => {
  return defer({
    data: fetch(
      `https://api-nijynot.vercel.app/api/collection/info?id=${params.address}`
    ).then((res) => res.json()),
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export default function Page() {
  const { address } = useParams() as any;
  const { setBreadcrumbs } = useLauncher() as any;

  // const attributesFetcher = async () => {
  //   return fetch(`https://api.reservoir.tools/collections/${address}/attributes/all/v2`, {
  //     headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
  //   }).then((res) => res.json())
  // };

  const fetcher = (address: string) => {
    return ({ pageParam }: any) => {
      const url = pageParam
        ? `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&cursor=${encodeURIComponent(pageParam)}`
        : `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}`;

      return fetch(url, {
        headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
      }).then((res) => res.json());
    };
  };

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
      return lastPage?.cursor;
    },
  }) as any;
  // const { data: attributesData } = useQuery(`/nft/${address}:attributes`, attributesFetcher, {
  //   staleTime: Infinity,
  //   refetchOnWindowFocus: false,
  //   refetchOnMount: false,
  //   refetchOnReconnect: false,
  // });

  
  const nfts = nftData?.pages?.reduce(
    (state: any, current: any) => state.concat(current?.tokens),
    []
  );

  console.log(nftData);
  console.log(nfts);

  return (
    <main className="page">
      <Suspense fallback={<div>loading...</div>}>
        <Await resolve={data}>
          {(data) => {
            return (
              <>
                <Breadcrumb data={[{ text: data?.name }]} />
                <div className="collection-header pad">
                  <div className="collection-image-wrapper">
                    <Image
                      className="collection-image"
                      src={data?.image}
                      alt={data?.name}
                    />
                  </div>
                  <div className="collection-core">
                    <div>{data?.name}</div>
                    <div className="collection-core-address">{address}</div>
                  </div>

                  <div className="collection-info">
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        FLOOR PRICE
                      </div>
                      <div className="collection-info-group-value">
                        Ξ{data?.floor?.price?.amount?.native}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">TOP BID</div>
                      <div className="collection-info-group-value">
                        {data?.topBid?.price?.amount?.native
                          ? `Ξ${data?.topBid?.price?.amount?.native}`
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL VOLUME
                      </div>
                      <div className="collection-info-group-value">
                        {data?.volume?.allTime
                          ? `Ξ${data?.volume?.allTime}`
                          : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL LISTED
                      </div>
                      <div className="collection-info-group-value">
                        {data?.listed ? data?.listed : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL SUPPLY
                      </div>
                      <div className="collection-info-group-value">
                        {data?.supply ? data?.supply : '—'}
                      </div>
                    </div>
                    <div className="collection-info-group">
                      <div className="collection-info-group-key">
                        TOTAL HOLDERS
                      </div>
                      <div className="collection-info-group-value">
                        {data?.holders ? data?.holders : '—'}
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
        <>
          <div className="collection-search pad">
            <Filter />
          </div>
          <div className="nft-grid pad">
            {nfts?.map((nft: any, i: number) => (
              <NFT key={i} nft={nft} market={nft?.market} />
            ))}

            {(isLoading || isFetchingNextPage) &&
              Array(nftsPerPage)
                .fill(0)
                .map((_, i) => (
                  <div className="nft" key={`${Math.random()}:${i}`}>
                    <Spinner kind="line" />
                  </div>
                ))}
          </div>
        </>
      ) : (
        <div>error!</div>
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>load more!</button>
      )}
    </main>
  );
}
