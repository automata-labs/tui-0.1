import { useMeasure } from '@react-hookz/web';
import type { LoaderFunction } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import request, { gql } from 'graphql-request';
import { useState } from 'react';

import { Render } from '~/components/render';
import stylesheet from '~/styles/display.css';

export const loader: LoaderFunction = async ({ params }) => {
  const variables = { address: params.address, id: params.id };
  const query = gql`
    query NFT($address: String!, $id: String!) {
      nft(address: $address, id: $id) {
        address
        id
        name
        description
        owner

        collection {
          name
          tokenCount
          image
        }

        attributes {
          key
          value
          tokenCount
        }
      }
    }
  `;

  return defer({
    data: await request('http://localhost:4001/graphql', query, variables),
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
        <div className="display-image">
          <Render preset="original" address={address} id={id} />
        </div>
        <div className="display-label">
          <div className="display-label-name">{data?.nft?.name ?? `#${data?.nft?.id}`}</div>
          <div className="display-label-collection">
            <div className="display-label-collection-icon">
              <img
                className="display-label-collection-image"
                src={data?.nft?.collection?.image}
                alt="ok"
              />
            </div>
            <div className="display-label-collection-name">
              {data?.nft?.collection?.name}
            </div>
          </div>
          <div className="display-label-description-wrapper">
            {data?.nft?.description && (
              <div
                ref={ref}
                className="display-label-description"
                style={{ maxHeight: readMore ? '100%' : '150px' }}
              >
                {data?.nft?.description}

                {height >= 143 && !readMore && (
                  <div className="display-label-description-gradient"></div>
                )}
              </div>
            )}
            {height >= 143 && (
              <button
                className="text-button display-label-read-more-button"
                onClick={() => setReadMore(!readMore)}
              >
                {!readMore ? 'READ MORE' : 'SHOW LESS'}
              </button>
            )}
          </div>

          <div className="display-label-group">
            <div className="display-label-group-key">Owner</div>
            <div className="display-label-group-value">{data?.nft?.owner}</div>
          </div>
          <div className="display-label-group">
            <div className="display-label-group-key">ID</div>
            <div className="display-label-group-value">{data?.nft?.id}</div>
          </div>
          <div className="display-label-group">
            <div className="display-label-group-key">Contract</div>
            <div className="display-label-group-value">{data?.nft?.address}</div>
          </div>

          <div className="divider divider--display"></div>

          <div className="display-label-attributes">
            <div className="display-label-attributes-heading">ATTRIBUTES</div>

            {data?.nft?.attributes.map((attribute: any, i: number) => (
              <div key={i} className="display-label-attribute">
                <div className="display-label-attribute-key">{attribute?.key}</div>
                <div className="display-label-attribute-value">
                  <div className="display-label-attribute-value-value">{attribute?.value}</div>

                  <div className="display-label-attribute-count">{attribute?.tokenCount}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
