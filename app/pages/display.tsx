import { useMeasure } from '@react-hookz/web';
import type { LoaderFunction } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { Await, useLoaderData, useParams } from '@remix-run/react';
import { Suspense, useState } from 'react';

import { Render } from '~/components/render';
import stylesheet from '~/styles/display.css';

export const loader: LoaderFunction = async ({ params }) => {
  const data = fetch(
    `https://api-nijynot.vercel.app/api/nft?address=${params.address}&id=${params.id}`
  ).then((res) => res.json());

  return defer({
    data,
  });
};

export function links() {
  return [{ rel: 'stylesheet', href: stylesheet }];
}

export default function Page() {
  const { address, id } = useParams() as any;
  const { data } = useLoaderData();
  const [readMore, setReadMore] = useState(false);
  const [measurement, ref] = useMeasure<HTMLDivElement>();

  const height = measurement ? measurement.height : 0;

  return (
    <main className="page">
      <div className="display">
        <Suspense>
          <Await resolve={data}>
            {(data) => {
              return (
                <>
                  <div className="display-image">
                    <Render preset="original" address={address} id={id} />
                  </div>
                  <div className="display-label">
                    <div className="display-label-name">
                      {data?.name ?? `#${data?.id}`}
                    </div>
                    <div className="display-label-collection">
                      <div className="display-label-collection-icon">
                        <img
                          className="display-label-collection-image"
                          src={data?.collection?.image}
                          alt="ok"
                        />
                      </div>
                      <div className="display-label-collection-name">
                        {data?.collection?.name}
                      </div>
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
                      <div className="display-label-group-value">
                        {data?.owner}
                      </div>
                    </div>
                    <div className="display-label-group">
                      <div className="display-label-group-key">ID</div>
                      <div className="display-label-group-value">
                        {data?.id}
                      </div>
                    </div>
                    <div className="display-label-group">
                      <div className="display-label-group-key">Contract</div>
                      <div className="display-label-group-value">
                        {data?.contract}
                      </div>
                    </div>

                    <div className="divider divider--display"></div>

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
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
    </main>
  );
}
