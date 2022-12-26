import type { MediaPreset } from '@center-inc/react';
import { useCenterContext } from '@center-inc/react';
import { useQuery } from '@tanstack/react-query';
import contentTypeParser from 'content-type-parser';
import { useState } from 'react';

import CollectionImage, {
  links as collectionImageLinks,
} from './collection-image';
import Spinner from './spinner';

export const links = () => [...collectionImageLinks()];

type RenderProps = {
  preRender?: string;
  address: string;
  id: string;
  preset: MediaPreset;
  fallback?: string;
};

export default function Render({
  preRender,
  address,
  id,
  preset,
  fallback,
}: RenderProps) {
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
  const { data, error } = useQuery(
    [`render:${address}:${id}:${preset}`],
    fetcher,
    {
      enabled: shouldRender,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: (failureCount: number, error: any) => {
        if (
          error.message ===
          'network ID is invalid or asset does not have associated metadata'
        ) {
          return false;
        }

        if (failureCount >= 3) {
          return false;
        }

        return true;
      },
    },
  );

  const parsed = contentTypeParser(preRender ?? data?.contentType);
  const type = parsed && parsed.type;

  return (
    <>
      {!loaded && !error && <Spinner kind="line" />}
      {error && (
        <div className="flex flex-col items-center">
          <CollectionImage src={fallback} large />
          <div
            className="flex justify-center pt-2 opacity-50"
            style={{ fontSize: 11 }}
          >
            Content not available yet
          </div>
        </div>
      )}
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
