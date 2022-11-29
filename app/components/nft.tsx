import { Link } from '@remix-run/react';
import { Render } from './render';

type NFTProps = {
  nft: {
    address: string;
    contract: string;
    id: string;
    tokenId: string;
    name: string;
    collection: {
      name: string;
      image: string;
    };
    lastBuy: {
      value: string;
      timestamp: number;
    };
    lastSell: {
      value: string;
      timestamp: number;
    };
    floor: {
      priceEth: string;
      source: {
        id: string;
        domain: string;
        name: string;
        icon: string;
        url: string;
      };
    };
  };
  market: {
    floorAsk: {
      price: {
        amount: {
          decimal: number;
          native: number;
          raw: number;
          usd: number;
        };
      };
      source: {
        domain: string;
        icon: string;
        id: string;
        name: string;
        url: string;
      };
    };
  };
};

export default function NFT({ nft, market }: NFTProps) {
  const address = nft?.address ?? nft?.contract;
  const id = nft?.id ?? nft?.tokenId;

  let lastSale;

  if (nft?.lastBuy?.value) {
    lastSale = nft?.lastBuy?.value;
  }

  if (nft?.lastSell?.value) {
    lastSale = nft?.lastBuy?.value;
  }

  return (
    <Link className="nft" to={`/nft/${address}/${id}`}>
      <div className="nft-info">
        <div className="nft-name">{nft?.name ? nft?.name : `#${id}`}</div>
        <div className="nft-collection">
          <img
            className="nft-collection-image"
            src={nft?.collection?.image}
            alt={nft?.collection?.name}
          />
          <div className="nft-collection-name">{nft?.collection?.name}</div>
        </div>
        <div className="nft-price">
          <div className="nft-price-floor">
            <div className="nft-price-title">Price</div>
            <div className="nft-price-value">
              Ξ{market.floorAsk.price.amount.native}
            </div>
          </div>
          {lastSale && (
            <div className="nft-price-last">
              <div className="nft-price-title">Last Sale</div>
              <div className="nft-price-value">Ξ{lastSale}</div>
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
