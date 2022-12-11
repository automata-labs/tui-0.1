import { useParams, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';
import Filter from '~/components/filter';
import Image from '~/components/image';
import CollectionHeader from '~/skeletons/collection-header';
import { useTerminal } from '~/contexts/terminal-context';
import useCollection from '~/hooks/useCollection';
import useTraits from '~/hooks/useTraits';
import CollectionFilter from '~/components/collection-filter';
import Icon from '~/terminal/components/icon';

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export default function Page() {
  const fetcher = ({ pageParam }: any) => {
    const url = pageParam
      ? `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&cursor=${encodeURIComponent(
          pageParam
        )}&${searchParams.toString()}`
      : `https://api-nijynot.vercel.app/api/collection/nfts?id=${address}&${searchParams.toString()}`;

    return fetch(url).then((res) => res.json());
  };

  const { address } = useParams() as any;
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAnchor, launch, hide } = useTerminal() as any;
  const { data: dataInfo, loading: loadingCollection } = useCollection(
    address
  ) as any;
  const _ = useTraits(address);
  const {
    data: dataNFTs,
    error,
    fetchNextPage,
    hasNextPage,
    isLoading: load1,
    isFetchingNextPage: fetch1,
  } = useInfiniteQuery(
    `nft-pages:${address}:${searchParams.toString()}`,
    fetcher,
    {
      staleTime: Infinity,
      getNextPageParam: (lastPage: any) => {
        return lastPage?.cursor;
      },
    }
  ) as any;

  const [ref, { entry }] = useIntersectionObserver();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    hide();
    setAnchor(`/collection/${address}`);
  }, [address]);

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
              <div className="collection-core-name">{dataInfo?.name}</div>
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
            <button
              className="button button--filled attributes-filter"
              onClick={() => {
                launch(`/collection/${address}/trait`);
              }}
            >
              Traits
              <Icon kind="filter" />
            </button>
            <Filter text="Platform" />
            {dataInfo?.supply ? (
              <div className="collection-filters-items-number">
                {dataInfo?.supply} items
              </div>
            ) : (
              <Spinner kind="line" />
            )}
          </div>
          {searchParams.toString() !== '' && (
            <div className="collection-active-filters pad">
              {Array.from(searchParams.entries()).map((entry, i) => {
                return <CollectionFilter key={i} searchParam={entry} />;
              })}

              <button
                className="button button--text"
                onClick={() => {
                  setSearchParams({}, { replace: true });
                }}
              >
                <Icon kind="x-square-fill" />
                <span>Clear all sort, filters, ...</span>
              </button>
            </div>
          )}
          <div ref={scrollerRef}>
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
