import { useClickOutside } from '@react-hookz/web';
import { useNavigate } from '@remix-run/react';
import { DateTime } from 'luxon';
import { useRef } from 'react';
import { useSearch } from '~/contexts/search';
import useMousetrap from '~/hooks/useMousetrap';
import { hashid } from '~/utils/hex';

import Image from './image';
import SearchResult from './search-result';
import Spinner from './spinner';

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
            active={
              selected?.type === 'block' && selected?.number === block?.number
            }
            image={'Blk'}
            title={`Block ${block?.number}`}
            subtitle={hashid(block?.hash)}
            secondaryTitle={<>{block?.transactions?.length} txs</>}
            secondarySubtitle={DateTime.fromSeconds(
              Number(block?.timestamp),
            ).toRelative()}
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
        active={
          selected?.type === 'token' && selected?.address === token.address
        }
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
          key={collection?.collectionId ?? collection?.id}
          value={collection}
          type="collection"
          to={`/collection/${collection?.collectionId ?? collection?.id}`}
          active={
            selected?.type === 'collection' && selected?.id === collection?.id
          }
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

  const {
    value,
    setValue,
    setQuery,
    visible,
    setVisible,
    selected,
    setIndex,

    increment,
    decrement,
    loadingTokens,
    loadingCollections,
    open,
    close,
    reset,
  } = useSearch() as any;

  const hide = () => {
    close(false);
    inputRef?.current?.blur();
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
          setQuery(e.target.value);
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
            setVisible(false);
            reset();
          }

          if (e.key === 'Escape') {
            hide();
          }
        }}
      />

      {visible &&
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
