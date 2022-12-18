import type { MediaPreset } from '@center-inc/react';
import { useCenterContext } from '@center-inc/react';
import contentTypeParser from 'content-type-parser';
import { useState } from 'react';
import { useQuery } from 'react-query';

import Spinner from './spinner';

type RenderProps = {
  preRender?: string;
  address: string;
  id: string;
  preset: MediaPreset;
};

export function Render({ preRender, address, id, preset }: RenderProps) {
  const fetcher = async () => {
    return client.rendering.renderNft({
      address,
      tokenId: id,
      preset,
      network: 'ethereum-mainnet',
    });
  };

  const { client } = useCenterContext();
  const [shouldRender, setShouldRender] = useState(!preRender);
  const [loaded, setLoaded] = useState(false);
  const { data } = useQuery(`nft:${address}:${id}:${preset}`, fetcher, {
    enabled: shouldRender,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  const parsed = contentTypeParser(preRender ?? data?.contentType);
  const type = parsed && parsed.type;

  return (
    <>
      {!loaded && <Spinner kind="line" />}
      {(type === 'image' || preRender) && (
        <img
          className="nft-image"
          style={{ display: loaded ? 'initial' : 'none' }}
          src={preRender ?? data?.mediaUrl}
          onLoad={() => setLoaded(true)}
          onError={() => {
            setShouldRender(true);
          }}
          alt={'rendered nft'}
        />
      )}
      {type === 'video' && (
        <video
          className="nft-image"
          style={{ display: loaded ? 'initial' : 'none' }}
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
