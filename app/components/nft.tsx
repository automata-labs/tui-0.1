import { Link } from "@remix-run/react";
import { Render } from "./render";

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
  };
};

export default function NFT({ nft }: NFTProps) {
  const address = nft?.address ?? nft?.contract;
  const id = nft?.id ?? nft?.tokenId;

  return (
    <Link className="nft" to={`/nft/${address}/${id}`}>
      <div className="nft-core"></div>
      <div className="nft-image-wrapper">
        <Render address={address} id={id} preset="medium" />
      </div>
    </Link> 
  );
}
