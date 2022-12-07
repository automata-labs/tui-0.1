import { useClickOutside } from '@react-hookz/web';
import { DateTime } from 'luxon';
import { useRef, useState } from 'react';

import Spinner from './spinner';
import Image from './image';
import { hashid } from '~/utils/hex';
import { useSearch } from '~/contexts/search';
import SearchResult from './search-result';
import useMousetrap from '~/hooks/useMousetrap';
import { useNavigate } from '@remix-run/react';

function BlockResults() {
  const { blocks, match, selected } = useSearch() as any;
  const block = blocks[0];

  if (match) {
    if (blocks?.length > 0 && block?.hash) {
      return (
        <>
          <div className="search-results-title">Block</div>

          <SearchResult
            value={block}
            to={`/block/${block?.number}`}
            type="block"
            active={selected?.type === 'block' && selected?.number === block?.number}
            image={"Blk"}
            title={`Block ${block?.number}`}
            subtitle={hashid(block?.hash)}
            secondaryTitle={<>{block?.transactions?.length} txs</>}
            secondarySubtitle={DateTime.fromSeconds(Number(block?.timestamp)).toRelative()}
          />
        </>
      );
    }
  }

  return <></>;
}

function TokenResults() {
  const { tokens, search, selected } = useSearch() as any;

  let render;

  if (tokens?.length > 0) {
    render = tokens?.map((token: any, i: number) => (
      <SearchResult
        key={token?.address}
        value={token}
        type="token"
        to={`/token/${token?.address}`}
        active={selected?.type === 'token' && selected?.address === token.address}
        image={
          <Image
            className="search-result-image"
            src={token?.logo}
            alt={token?.name}
          />
        }
        title={
          <>
            {token?.name}
            {token?.symbol && (
              <div className="search-result-main-title-ext">
                ${token?.symbol}
              </div>
            )}
          </>
        }
        subtitle={<>{token?.price ? `$${token?.price}` : '—'}</>}
        secondaryTitle={<>{token?.volume24h ? `$${token?.volume24h}` : '—'}</>}
        secondarySubtitle={'volume'}
      />
    ));
  } else {
    render = <div className="search-result-empty">No tokens found.</div>;
  }

  return (
    <>
      <div className="search-results-title">
        {search ? 'Tokens' : 'Trending Tokens'}
      </div>
      {render}
    </>
  );
}

function CollectionResults() {
  const { collections, search, selected } = useSearch() as any;

  let render;

  if (collections?.length > 0) {
    render = collections?.map((collection: any) => {
      const floor =
        collection?.floorAskPrice ?? collection?.floor?.price?.amount?.native;
      const volume = collection?.allTimeVolume ?? collection?.volume?.allTime;

      return (
        <SearchResult
          key={collection?.collectionId}
          value={collection}
          type="collection"
          to={`/collection/${collection?.collectionId ?? collection?.id}`}
          active={selected?.type === 'collection' && selected?.id === collection?.id}
          image={
            <Image
              className="search-result-image"
              src={collection?.image}
              alt={collection?.name}
            />
          }
          title={collection?.name}
          subtitle={floor ? `Ξ${floor} floor` : '—'}
          secondaryTitle={volume ? `Ξ${volume}` : '—'}
          secondarySubtitle={'volume'}
        />
      );
    });
  } else {
    render = <div className="search-result-empty">No collections found.</div>;
  }

  return (
    <>
      <div className="search-results-title">
        {search ? 'NFT Collections' : 'Trending NFT Collections'}
      </div>
      {render}
    </>
  );
}

export default function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const outsideRef = useRef(null);
  const navigate = useNavigate();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [value, setValue] = useState('');
  const {
    selected,
    setIndex,
    setSearch,
    select,
    increment,
    decrement,
    loadingTokens,
    loadingCollections,
  } = useSearch() as any;

  const open = () => {
    setIsSearchOpen(true);
    select(0);
  };

  const hide = () => {
    setIsSearchOpen(false);
    inputRef?.current?.blur();
  };

  const reset = () => {
    setValue('');
    setSearch('');
  };

  useClickOutside(outsideRef, () => hide());
  useMousetrap('/', (e: KeyboardEvent) => {
    e.preventDefault();

    inputRef?.current?.focus();
    open();
  });

  return (
    <div ref={outsideRef} className="navigation-bar-search">
      <input
        ref={inputRef}
        className="input input--empty navigation-bar-search-input"
        placeholder="Search tokens, collections, accounts and more..."
        value={value}
        onFocus={() => open()}
        onChange={(e) => {
          setValue(e.target.value);
          setSearch(e.target.value);
          setIndex(0);
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            increment();
          }

          if (e.key === 'ArrowUp') {
            decrement();
          }

          if (e.key === 'Enter' && selected?.to) {
            navigate(selected?.to);
            setIsSearchOpen(false);
            reset();
          }

          if (e.key === 'Escape') {
            hide();
          }
        }}
      />

      {isSearchOpen &&
        (loadingTokens || loadingCollections ? (
          <div className="center pad-2x">
            <Spinner kind="simpleDotsScrolling" />
          </div>
        ) : (
          <div className="search-results">
            <BlockResults />
            <TokenResults />
            <CollectionResults />
          </div>
        ))}
    </div>
  );
}
