import { Link } from '@remix-run/react';

import useNFTSearch from '~/hooks/useNFTSearch';
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

export default function Search({ search, hide }: SearchProps) {
  const { data, isLoading, isFetching } = useNFTSearch(search);

  let render;

  if (isLoading || isFetching) {
    render = Array(4)
      .fill(0)
      .map((_, i) => <SearchResultSkeleton key={i} />);
  } else if (data?.length > 0) {
    render = data?.map((collection: any) => {
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
    render = <div className="search-result-empty">No collections found.</div>;
  }

  return (
    <>
      <div className="search-results">
        {search ? (
          <div className="search-results-title">NFT Collections</div>
        ) : (
          <div className="search-results-title">Trending NFT Collections</div>
        )}

        {render}
      </div>
    </>
  );
}
