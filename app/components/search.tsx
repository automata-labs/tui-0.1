import { Link } from '@remix-run/react';

import useNFTSearch from '~/hooks/useNFTSearch';
import useTokenSearch from '~/hooks/useTokenSearch';
import Spinner from './spinner';
import Image from './image';

type SearchProps = {
  search: string;
  hide: any;
};

function SearchResultSkeleton() {
  return (
    <div className="search-result">
      <div className="search-result-image-wrapper">
        <Spinner kind="line" />
      </div>
      <div className="search-result-main">
        <div className="search-result-main-title">
          <Spinner kind="simpleDotsScrolling" />
        </div>
        <div className="search-result-main-subtitle">-</div>
      </div>
      <div className="search-result-secondary">
        <div className="search-result-secondary-title"></div>
        <div className="search-result-secondary-subtitle"></div>
      </div>
    </div>
  );
}

function SearchTokenResultSkeleton() {
  return (
    <div className="search-result">
      <div className="search-result-image-wrapper search-result-image-wrapper--token">
        <Spinner kind="line" />
      </div>
      <div className="search-result-main">
        <div className="search-result-main-title">
          <Spinner kind="simpleDotsScrolling" />
        </div>
        <div className="search-result-main-subtitle">-</div>
      </div>
      <div className="search-result-secondary">
        <div className="search-result-secondary-title"></div>
        <div className="search-result-secondary-subtitle"></div>
      </div>
    </div>
  );
}

export default function Search({ search, hide }: SearchProps) {
  const {
    data: nftsData,
    isLoading: load0,
    isFetching: fetch0,
  } = useNFTSearch(search);
  const {
    data: tokensData,
    isLoading: load1,
    isFetching: fetch1,
  } = useTokenSearch(search);

  let tokensRender;
  let nftsRender;

  if (load1 || fetch1) {
    tokensRender = Array(4)
      .fill(0)
      .map((_, i) => <SearchTokenResultSkeleton key={i} />);
  } else if (tokensData?.length > 0) {
    tokensRender = tokensData?.map((token: any) => (
      <Link
        to={`/token/${token?.address}`}
        onClick={() => hide()}
        className="search-result"
        key={token?.address}
      >
        <div className="search-result-image-wrapper search-result-image-wrapper--token">
          <Image
            className="search-result-image"
            src={token?.logo}
            alt={token?.name}
          />
        </div>
        <div className="search-result-main">
          <div className="search-result-main-title">
            {token?.name}
            {token?.symbol && (
              <div className="search-result-main-title-ext">
                ${token?.symbol}
              </div>
            )}
          </div>
          <div className="search-result-main-subtitle">
            {token?.price ? `$${token?.price}` : '—'}
          </div>
        </div>
        <div className="search-result-secondary">
          <div className="search-result-secondary-title">
            {token?.volume24h ? `$${token?.volume24h}` : '—'}
          </div>
          <div className="search-result-secondary-subtitle">volume</div>
        </div>
      </Link>
    ));
  } else {
    nftsRender = <div className="search-result-empty">No tokens found.</div>;
  }

  if (load0 || fetch0) {
    nftsRender = Array(4)
      .fill(0)
      .map((_, i) => <SearchResultSkeleton key={i} />);
  } else if (nftsData?.length > 0) {
    nftsRender = nftsData?.map((collection: any) => {
      const floor =
        collection?.floorAskPrice ?? collection?.floor?.price?.amount?.native;
      const volume = collection?.allTimeVolume ?? collection?.volume?.allTime;

      return (
        <Link
          to={`/collection/${collection?.collectionId ?? collection?.id}`}
          onClick={() => hide()}
          className="search-result"
          key={collection?.collectionId}
        >
          <div className="search-result-image-wrapper">
            <Image
              className="search-result-image"
              src={collection?.image}
              alt={collection?.name}
            />
          </div>
          <div className="search-result-main">
            <div className="search-result-main-title">{collection?.name}</div>
            <div className="search-result-main-subtitle">
              {floor ? `Ξ${floor} floor` : '—'}
            </div>
          </div>
          <div className="search-result-secondary">
            <div className="search-result-secondary-title">
              {volume ? `Ξ${volume}` : '—'}
            </div>
            <div className="search-result-secondary-subtitle">volume</div>
          </div>
        </Link>
      );
    });
  } else {
    nftsRender = (
      <div className="search-result-empty">No collections found.</div>
    );
  }

  return (
    <>
      <div className="search-results">
        {search ? (
          <div className="search-results-title">Tokens</div>
        ) : (
          <div className="search-results-title">Trending Tokens</div>
        )}

        {tokensRender}

        {search ? (
          <div className="search-results-title">NFT Collections</div>
        ) : (
          <div className="search-results-title">Trending NFT Collections</div>
        )}

        {nftsRender}
      </div>
    </>
  );
}
