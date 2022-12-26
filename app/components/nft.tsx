import { Link } from '@remix-run/react';

import CollectionIcon from './collection-icon';
import Icon from './icon';
import Render from './render';

export default function NFT({ nft }: any) {
  const address = nft?.address ?? nft?.contract;
  const id = nft?.id ?? nft?.tokenId;

  return (
    <Link className="nft" to={`/nft/${address}/${id}`}>
      <div className="nft-info">
        <div className="nft-name-collection">
          <div className="nft-name">{nft?.name ? nft?.name : `#${id}`}</div>
          <div className="nft-collection">
            <CollectionIcon image={nft?.collection?.image} loading={false} />
            <div className="nft-collection-name">{nft?.collection?.name}</div>
          </div>
        </div>
        {nft?.floor?.source?.domain && (
          <div className="nft-platform">
            <div className="nft-group-title">Platform</div>
            <div className="nft-platform-value">
              <Icon kind={nft?.floor?.source?.domain} />{' '}
              {nft?.floor?.source?.name}
            </div>
          </div>
        )}
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
        <Render
          preRender={nft?.image}
          address={address}
          id={id}
          preset="medium"
          fallback={nft?.collection?.image}
        />
      </div>
    </Link>
  );
}
