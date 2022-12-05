import { useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { useInfiniteQuery, useQuery } from 'react-query';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';
import Filter from '~/components/filter';
import Image from '~/components/image';
import CollectionHeader from '~/skeletons/collection-header';
import useFetchers from '~/hooks/useFetchers';

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export function fetchers(address: string) {
  const a = () => {
    return fetch(
      `http://api-nijynot.vercel.app/api/collection/info?id=${address}`
    ).then((res) => res.json());
  };

  const b = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&cursor=${encodeURIComponent(
          pageParam
        )}`
      : `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}`;

    return fetch(url, {
      headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
    }).then((res) => res.json());
  };

  return [a, b];
}

export default function Page() {
  const { address } = useParams() as any;
  const [fetcherInfo, fetcherNFTs] = useFetchers(fetchers(address)) as any;

  const [ref, { entry }] = useIntersectionObserver();

  const {
    data: dataInfo,
    isLoading: load0,
    isFetching: fetch0,
  } = useQuery(`/collection/${address}`, fetcherInfo, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  }) as any;
  const {
    data: dataNFTs,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading: load1,
    isFetchingNextPage: fetch1,
  } = useInfiniteQuery(`/nft/${address}`, fetcherNFTs, {
    staleTime: Infinity,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.cursor;
    },
  }) as any;

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  return (
    <main className="page">
      {load0 || fetch0 ? (
        <CollectionHeader />
      ) : (
        <>
          <div className="collection-header pad">
            <div className="collection-image-wrapper">
              <Image
                className="collection-image"
                src={dataInfo?.image}
                alt={dataInfo?.name}
              />
            </div>
            <div className="collection-core">
              <div>{dataInfo?.name}</div>
              <div className="collection-core-address">{address}</div>
            </div>

            <div className="collection-info">
              <div className="collection-info-group">
                <div className="collection-info-group-key">FLOOR PRICE</div>
                <div className="collection-info-group-value">
                  Ξ{dataInfo?.floor?.price?.amount?.native}
                </div>
              </div>
              <div className="collection-info-group">
                <div className="collection-info-group-key">TOP BID</div>
                <div className="collection-info-group-value">
                  {dataInfo?.topBid?.price?.amount?.native
                    ? `Ξ${dataInfo?.topBid?.price?.amount?.native}`
                    : '—'}
                </div>
              </div>
              <div className="collection-info-group">
                <div className="collection-info-group-key">TOTAL VOLUME</div>
                <div className="collection-info-group-value">
                  {dataInfo?.volume?.allTime
                    ? `Ξ${dataInfo?.volume?.allTime}`
                    : '—'}
                </div>
              </div>
              <div className="collection-info-group">
                <div className="collection-info-group-key">TOTAL LISTED</div>
                <div className="collection-info-group-value">
                  {dataInfo?.listed ? dataInfo?.listed : '—'}
                </div>
              </div>
              <div className="collection-info-group">
                <div className="collection-info-group-key">TOTAL SUPPLY</div>
                <div className="collection-info-group-value">
                  {dataInfo?.supply ? dataInfo?.supply : '—'}
                </div>
              </div>
              <div className="collection-info-group">
                <div className="collection-info-group-key">TOTAL HOLDERS</div>
                <div className="collection-info-group-value">
                  {dataInfo?.holders ? dataInfo?.holders : '—'}
                </div>
              </div>
            </div>

            <Tabs>
              <Tab to={`/nft/${address}`} label="ITEMS" />
            </Tabs>
          </div>
          <div className="divider"></div>
        </>
      )}

      {!error ? (
        <>
          <div className="collection-search pad">
            <Filter />
          </div>
          <div>
            {dataNFTs?.pages?.map((page: any, i: number) => {
              return (
                <div key={i} className="nft-grid pad">
                  {page?.tokens?.map((nft: any, j: number) => {
                    const target =
                      dataNFTs?.pages.length === i + 1 &&
                      page?.tokens.length === j + 1;

                    return (
                      <NFT
                        innerRef={target ? ref : undefined}
                        key={`${i}:${j}:${nft.id}`}
                        nft={nft}
                        market={nft?.market}
                      />
                    );
                  })}
                </div>
              );
            })}

            {(load1 || fetch1) && (
              <div className="nft-grid pad">
                {Array(30)
                  .fill(0)
                  .map((_, i) => {
                    return (
                      <div className="nft" key={`${Math.random()}:${i}`}>
                        <Spinner kind="line" />
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="pad">Failed to load collection.</div>
      )}

      {hasNextPage && (
        <div className="pad collection-load-more-wrapper">
          <button
            onClick={() => fetchNextPage()}
            className="button button--fullscreen"
          >
            Load more
          </button>
        </div>
      )}
    </main>
  );
}
