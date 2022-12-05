import { Link } from '@remix-run/react';
import { DateTime } from 'luxon';

import useBlockSearch from '~/hooks/useBlockSearch';
import useNFTSearch from '~/hooks/useNFTSearch';
import useTokenSearch from '~/hooks/useTokenSearch';
import Spinner from './spinner';
import Image from './image';
import { hashid } from '~/utils/hex';

type SearchProps = {
  search: string;
  hide: any;
};

function SearchResultCollectionSkeleton() {
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

function SearchResultCollection({ collection, hide }: any) {
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
}

function SearchResultBlockSkeleton({ search }: { search: string }) {
  return (
    <Link to={`/block/${search}`} className="search-result">
      <div className="search-result-image-wrapper">Blk</div>
      <div className="search-result-main">
        <div className="search-result-main-title">Block {search}</div>
        <div className="search-result-main-subtitle">-</div>
      </div>
      <div className="search-result-secondary">
        <div className="search-result-secondary-title">-</div>
        <div className="search-result-secondary-subtitle">-</div>
      </div>
    </Link>
  );
}

function SearchResultBlock({ block }: { block: any }) {
  return (
    <Link to={`/block/${block?.number}`} className="search-result">
      <div className="search-result-image-wrapper">Blk</div>
      <div className="search-result-main">
        <div className="search-result-main-title">Block {block?.number}</div>
        <div className="search-result-main-subtitle">{hashid(block?.hash)}</div>
      </div>
      <div className="search-result-secondary">
        <div className="search-result-secondary-title">
          {block?.transactions?.length} txs
        </div>
        <div className="search-result-secondary-subtitle">
          {DateTime.fromSeconds(Number(block?.timestamp)).toRelative()}
        </div>
      </div>
    </Link>
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

function SearchTokenResult({ token, hide }: any) {
  return (
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
            <div className="search-result-main-title-ext">${token?.symbol}</div>
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
  );
}

export default function Search({ search, hide }: SearchProps) {
  const [isBlockQuery, { data: blockData }] = useBlockSearch(search);
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

  let blockRender;
  let tokensRender;
  let collectionRender;

  if (isBlockQuery) {
    if (blockData?.hash) {
      blockRender = <SearchResultBlock block={blockData} />;
    } else {
      blockRender = <SearchResultBlockSkeleton search={search} />;
    }
  }

  if (load1 || fetch1) {
    tokensRender = Array(4)
      .fill(0)
      .map((_, i) => <SearchTokenResultSkeleton key={i} />);
  } else if (tokensData?.length > 0) {
    tokensRender = tokensData?.map((token: any) => (
      <SearchTokenResult key={token?.address} token={token} hide={hide} />
    ));
  } else {
    tokensRender = <div className="search-result-empty">No tokens found.</div>;
  }

  if (load0 || fetch0) {
    collectionRender = Array(4)
      .fill(0)
      .map((_, i) => <SearchResultCollectionSkeleton key={i} />);
  } else if (nftsData?.length > 0) {
    collectionRender = nftsData?.map((collection: any) => {
      return (
        <SearchResultCollection key={collection?.collectionId} collection={collection} hide={hide} />
      );
    });
  } else {
    collectionRender = (
      <div className="search-result-empty">No collections found.</div>
    );
  }

  return (
    <>
      <div className="search-results">
        {blockRender}

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

        {collectionRender}
      </div>
    </>
  );
}
