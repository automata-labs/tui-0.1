import type { MediaPreset } from '@center-inc/react';
import { useCenterContext } from '@center-inc/react';
import { defer } from '@remix-run/node';
import contentTypeParser from 'content-type-parser';
import { useState } from 'react';
import { useQuery } from 'react-query';
import Spinner from './spinner';

type RenderProps = {
  address: string;
  id: string;
  preset: MediaPreset;
};

export function Render({ address, id, preset }: RenderProps) {
  const { client } = useCenterContext();

  const fetcher = async () => {
    return client.rendering.renderNft({
      address,
      tokenId: id,
      preset,
      network: 'ethereum-mainnet',
    });
  };
  const { data } = useQuery(`/nft/${address}/${id}:${preset}`, fetcher, {
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
  const [loaded, setLoaded] = useState(false);

  const parsed = contentTypeParser(data?.contentType);
  const type = parsed && parsed.type;

  return (
    <>
      {!loaded && <Spinner />}
      {type === 'image' && (
        <img
          className="nft-image"
          style={{ display: loaded ? 'initial' : 'none' }}
          src={data?.mediaUrl}
          onLoad={() => setLoaded(true)}
          alt={'rendered nft'}
        />
      )}
      {type === 'video' && (
        <video
          controls
          autoPlay
          muted
          loop
          src={data?.mediaUrl}
          onCanPlay={() => setLoaded(true)}
        />
      )}
    </>
  );
}
