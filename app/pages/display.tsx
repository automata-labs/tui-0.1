import type { LoaderFunction } from '@remix-run/node';
import { defer } from '@remix-run/node';
import { useLoaderData, useParams } from '@remix-run/react';
import request, { gql } from 'graphql-request';

import { Render } from '~/components/render';
import stylesheet from '~/styles/display.css';

export const loader: LoaderFunction = async ({ params }) => {
  const variables = { address: params.address, id: params.id };
  const query = gql`
    query NFT($address: String!, $id: String!) {
      nft(address: $address, id: $id) {
        name
        description
        owner

        collection {
          name
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

  return (
    <main className="page page--display">
      <div className="display">
        <div className="display-image">
          <Render preset="original" address={address} id={id} />
        </div>
        <div className="display-label">
          <div className="display-label-name">{data?.nft?.name}</div>
          <div className="display-label-collection">{data?.nft?.collection?.name}</div>
          <div className="display-label-description">{data?.nft?.description}</div>
          <div className="display-label-group">
            <div className="display-label-group-title">OWNER</div>
            <div className="display-label-group-value">{data?.nft?.owner}</div>
          </div>
          <div className="divider"></div>
        </div>
      </div>
    </main>
  );
}
