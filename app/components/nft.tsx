import { Link } from '@remix-run/react';

import Image from './image';
import { Render } from './render';

export default function NFT({ innerRef, nft, market }: any) {
  const address = nft?.address ?? nft?.contract;
  const id = nft?.id ?? nft?.tokenId;

  return (
    <Link className="nft" to={`/nft/${address}/${id}`}>
      <div ref={innerRef} className="nft-info">
        <div className="nft-name">{nft?.name ? nft?.name : `#${id}`}</div>
        <div className="nft-collection">
          <div
            className="nft-collection-icon"
            style={{
              background: `url(${nft?.collection?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {!nft?.collection?.image && (
              <Image className="img--fallback" />
            )}
          </div>
          <div className="nft-collection-name">{nft?.collection?.name}</div>
        </div>
        <div className="nft-price">
          {nft?.floor?.price?.amount?.native && (
            <div className="nft-price-floor">
              <div className="nft-price-title">Price</div>
              <div className="nft-price-value">
                Ξ{nft?.floor?.price?.amount?.native}
              </div>
            </div>
          )}
          {nft?.last?.value && (
            <div className="nft-price-last">
              <div className="nft-price-title">Last Sale</div>
              <div className="nft-price-value">Ξ{nft?.last?.value}</div>
            </div>
          )}
        </div>
      </div>

      <div className="nft-image-wrapper">
        <Render address={address} id={id} preset="medium" />
      </div>
    </Link>
  );
}
