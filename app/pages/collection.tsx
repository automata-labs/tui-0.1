import { easings, useTransition, animated } from '@react-spring/web';
import { useParams, useSearchParams } from '@remix-run/react';
import { useEffect, useRef } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

import NFT from '~/components/nft';
import Spinner from '~/components/spinner';
import { Tab, Tabs } from '~/components/tabs';
import stylesheet from '~/styles/collection.css';
import Image from '~/components/image';
import CollectionHeader from '~/skeletons/collection-header';
import { useKernel } from '~/contexts/kernel';
import useCollection from '~/hooks/useCollection';
import useTraits from '~/hooks/useTraits';
import CollectionFilter from '~/components/collection-filter';
import Icon from '~/components/icon';
import useNFTs from '~/hooks/useNFTs';
import useSources from '~/hooks/useSources';

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export const handle = {
  breadcrumb: () => <Breadcrumb />,
  tabs: (_: any, logo: boolean) => <TabsBar logo={logo} />,
};

function Breadcrumb() {
  const { address } = useParams() as any;
  const { data: collection, loading: loadingCollection } =
    useCollection(address);

  return (
    <>
      <Icon kind="slash" />

      <div className="nft-collection" style={{ flexShrink: 1 }}>
        <div
          className="collection-icon"
          style={{
            backgroundImage: collection?.image
              ? `url(${collection?.image})`
              : '',
          }}
        >
          {loadingCollection && <Spinner kind="line" />}
          {!loadingCollection && !collection?.image && <Image className="img--fallback" />}
        </div>
        <div className="breadcrumb-text breadcrumb-text--auto-hide">
          {loadingCollection ? <Spinner kind="simpleDotsScrolling" /> : collection?.name}
        </div>
      </div>
    </>
  );
}

function TabsBar({ logo }: any) {
  const { address } = useParams() as any;
  const transitions = useTransition(logo, {
    from: { opacity: 0, width: '0px' },
    enter: { opacity: 1, width: '36px' },
    leave: { opacity: 0, width: '0px' },
    config: {
      duration: 500,
      easing: easings.easeOutExpo,
    },
  });

  return (
    <Tabs>
      {transitions((styles, item) => item && (
        <animated.div style={{ ...styles }}>
          <Icon kind="eclipse" />
        </animated.div>
      ))}
      <Tab to={`/collection/${address}`} label="Items" />
      <Tab to={`/collection/${address}/holders`} label="Holders" />
    </Tabs>
  );
}

export default function Page() {
  const { address } = useParams() as any;
  const [searchParams, setSearchParams] = useSearchParams();
  const { setAnchor, launch } = useKernel() as any;

  const { data: collection, loading: loadingCollection } =
    useCollection(address);
  const {
    data: nfts,
    error,
    loading: load1,
    fetching: fetch1,
    fetchNextPage,
    hasNextPage,
  } = useNFTs(address);

  useTraits(address);
  useSources(address);

  const [ref, { entry }] = useIntersectionObserver();
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAnchor(`/collection/${address}`);
  }, [address]);

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, fetchNextPage, hasNextPage]);

  return (
    <>
      <main className="page">
        {loadingCollection ? (
          <CollectionHeader />
        ) : (
          <>
            <div className="collection-header pad">
              <div className="collection-image-wrapper">
                <Image
                  className="collection-image"
                  src={collection?.image}
                  alt={collection?.name}
                />
              </div>
              <div className="collection-core">
                <div className="collection-core-name">{collection?.name}</div>
                <div className="collection-core-address">{address}</div>
              </div>

              <div className="collection-info">
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Floor Price</div>
                  <div className="collection-info-group-value">
                    Ξ{collection?.floor?.price?.amount?.native}
                  </div>
                </div>
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Top Bid</div>
                  <div className="collection-info-group-value">
                    {collection?.topBid?.price?.amount?.native
                      ? `Ξ${collection?.topBid?.price?.amount?.native}`
                      : '—'}
                  </div>
                </div>
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Total Volume</div>
                  <div className="collection-info-group-value">
                    {collection?.volume?.allTime
                      ? `Ξ${collection?.volume?.allTime}`
                      : '—'}
                  </div>
                </div>
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Total Listed</div>
                  <div className="collection-info-group-value">
                    {collection?.listed ? collection?.listed : '—'}
                  </div>
                </div>
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Total Supply</div>
                  <div className="collection-info-group-value">
                    {collection?.supply ? collection?.supply : '—'}
                  </div>
                </div>
                <div className="collection-info-group">
                  <div className="collection-info-group-key">Total Holders</div>
                  <div className="collection-info-group-value">
                    {collection?.holders ? collection?.holders : '—'}
                  </div>
                </div>
              </div>
            </div>
            <div className="divider"></div>
          </>
        )}

        {!error ? (
          <>
            <div className="collection-filters pad">
              <button
                className="button button--filled attributes-filter"
                onClick={() => {
                  launch(`/collection/${address}/sort`);
                }}
              >
                Sort
                <Icon kind="arrow-switch-vertical" />
              </button>
              <button
                className="button button--filled attributes-filter"
                onClick={() => launch(`/collection/${address}/traits`)}
              >
                Traits
                <Icon kind="filter" />
              </button>
              <button
                className="button button--filled attributes-filter"
                onClick={() => launch(`/collection/${address}/sources`)}
              >
                Platform
                <Icon kind="filter" />
              </button>
              {collection?.supply ? (
                <div className="collection-filters-items-number">
                  {collection?.supply} items
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
              {nfts?.pages?.map((page: any, i: number) => {
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
                {fetch1 && hasNextPage && (
                  <Spinner kind="simpleDotsScrolling" />
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="pad">Failed to load collection.</div>
        )}
      </main>
    </>
  );
}
