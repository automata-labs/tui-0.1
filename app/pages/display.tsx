import { useMeasure } from '@react-hookz/web';
import type { LoaderFunction } from '@remix-run/node';
import { Link, useParams } from '@remix-run/react';
import { useEffect, useState } from 'react';

import Icon from '~/components/icon';
import Image from '~/components/image';
import { Render } from '~/components/render';
import { useKernel } from '~/contexts/kernel';
import useNFT from '~/hooks/useNFT';
import stylesheet from '~/styles/display.css';

export const loader: LoaderFunction = async ({ params }) => {
  return null;
};

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export const handle = {
  breadcrumb: () => <Breadcrumb />,
};

function Breadcrumb() {
  const { address, id } = useParams() as any;
  const { data: nft, loading: loadingCollection } =
    useNFT(address, id);

  return (
    <>
      <Icon kind="slash" />
      <div className="breadcrumb-text">{nft?.name}</div>
    </>
  );
}

export default function Page() {
  const { address, id } = useParams() as any;
  const { data, loading } = useNFT(address, id) as any;

  const [readMore, setReadMore] = useState(false);
  const [measurement, ref] = useMeasure<HTMLDivElement>();
  const { setAnchor, hide } = useKernel() as any;

  const height = measurement ? measurement.height : 0;

  useEffect(() => {
    hide();
    setAnchor(`/nft/${address}/${id}`);
  }, []);

  return (
    <main className="page">
      <div className="display">
        {!loading && (
          <>
            <div className="display-image">
              <Render preset="original" address={address} id={id} />
            </div>
            <div className="display-label">
              <div className="display-label-name">
                {data?.name ?? `#${data?.id}`}
              </div>
              <div>
                <Link
                  to={`/collection/${address}`}
                  className="display-label-collection"
                >
                  <div
                    className="display-label-collection-icon"
                    style={{
                      background: `url(${data?.collection?.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    {!data?.collection?.image && (
                      <Image className="img--fallback" />
                    )}
                  </div>
                  <div className="display-label-collection-name">
                    {data?.collection?.name}
                  </div>
                </Link>
              </div>
              <div className="display-label-description-wrapper">
                {data?.description && (
                  <div
                    ref={ref}
                    className="display-label-description"
                    style={{ maxHeight: readMore ? '100%' : '150px' }}
                  >
                    {data?.description}

                    {height >= 143 && !readMore && (
                      <div className="display-label-description-gradient"></div>
                    )}
                  </div>
                )}
                {height >= 143 && (
                  <button
                    className="button button--text display-label-read-more-button"
                    onClick={() => setReadMore(!readMore)}
                  >
                    {!readMore ? 'READ MORE' : 'SHOW LESS'}
                  </button>
                )}
              </div>

              <div className="display-label-group">
                <div className="display-label-group-key">Owner</div>
                <div className="display-label-group-value">{data?.owner}</div>
              </div>
              <div className="display-label-group">
                <div className="display-label-group-key">ID</div>
                <div className="display-label-group-value">{data?.id}</div>
              </div>
              <div className="display-label-group">
                <div className="display-label-group-key">Contract</div>
                <div className="display-label-group-value">
                  {data?.contract}
                </div>
              </div>

              <div className="divider divider--display"></div>

              {data?.attributes?.length > 0 && (
                <div className="display-label-attributes">
                  <div className="display-label-attributes-heading">
                    ATTRIBUTES
                  </div>

                  {data?.attributes.map((attribute: any, i: number) => (
                    <div key={i} className="display-label-attribute">
                      <div className="display-label-attribute-key">
                        {attribute?.key}
                      </div>
                      <div className="display-label-attribute-value">
                        <div className="display-label-attribute-value-value">
                          {attribute?.value}
                        </div>

                        <div className="display-label-attribute-count">
                          {attribute?.tokenCount}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
