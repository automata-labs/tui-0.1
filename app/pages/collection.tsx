import { useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';
import Filter from '~/components/filter';
import Image from '~/components/image';
import CollectionHeader from '~/skeletons/collection-header';
import { useGoto, useTerminal } from '~/contexts/terminal-context';
import useCollection from '~/hooks/useCollection';

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export default function Page() {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&cursor=${encodeURIComponent(
          pageParam
        )}`
      : `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}`;

    return fetch(url, {
      headers: { 'x-api-key': 'keya3b4ede6985c6e4270561c6a' },
    }).then((res) => res.json());
  };

  const { address } = useParams() as any;
  const [ref, { entry }] = useIntersectionObserver();
  const { goto } = useGoto();
  const { hide } = useTerminal() as any;

  const { data: dataInfo, loading: loadingCollection } = useCollection(address) as any;
  const {
    data: dataNFTs,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading: load1,
    isFetchingNextPage: fetch1,
  } = useInfiniteQuery(`nft-pages:${address}`, fetcher, {
    staleTime: Infinity,
    getNextPageParam: (lastPage: any) => {
      return lastPage?.cursor;
    },
  }) as any;

  useEffect(() => {
    hide();
    goto(`/collection/${address}`);
  }, []);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  return (
    <main className="page">
      {loadingCollection ? (
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
          <div className="collection-filters pad">
            <Filter text="Price: Low to High" />
            <Filter text="Traits" />
            <Filter text="Platform" />
            {dataInfo?.supply ? (
              <div className="collection-filters-items-number">
                {dataInfo?.supply} items
              </div>
            ) : (
              <Spinner kind="line" />
            )}
          </div>
          <div>
            {dataNFTs?.pages?.map((page: any, i: number) => {
              return (
                <div key={i} className="nft-grid pad">
                  {page?.tokens?.map((nft: any, j: number) => {
                    return (
                      <NFT
                        key={`${i}:${j}:${nft.id}`}
                        nft={nft}
                        market={nft?.market}
                      />
                    );
                  })}
                </div>
              );
            })}

            {load1 && (
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

            <div ref={ref} className="collection-load-more-spinner">
              {fetch1 && hasNextPage && <Spinner kind="simpleDotsScrolling" />}
            </div>
          </div>
        </>
      ) : (
        <div className="pad">Failed to load collection.</div>
      )}
    </main>
  );
}
