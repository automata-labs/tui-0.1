import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useKernel } from '~/contexts/kernel';
import useCollection from '~/hooks/useCollection';
import useCommands from '~/hooks/useCommands';
import useTraits from '~/hooks/useTraits';
import Command from '~/components/terminal/command';

export default function CollectionCommands() {
  const { address } = useParams() as any;

  const { data: collection, loading } = useCollection(address);
  const { prompt } = useKernel() as any;
  const { commands } = useCommands(prompt, [
    {
      kind: 'terminal-link',
      icon: 'arrow-right',
      text: 'Filter by Traits',
      args: {
        to: `/collection/${address}/traits`,
      },
    },
    {
      kind: 'terminal-link',
      icon: 'arrow-right',
      text: 'Filter by Platform',
      args: {
        to: `/collection/${address}/sources`,
      },
    },
    ...(collection?.slug
      ? [
          {
            kind: 'href',
            icon: 'opensea',
            text: 'View on OpenSea ↗',
            args: {
              href: `https://opensea.io/collection/${collection?.slug}`,
            },
          },
        ]
      : []),
    {
      kind: 'href',
      icon: 'etherscan',
      text: 'View on Etherscan ↗',
      args: {
        href: `https://etherscan.io/address/${address}`,
      },
    },
  ]);

  // pre-load
  useTraits(address);

  return (
    <>
      {loading ? (
        <div className="center pad-1x">
          <Spinner kind="simpleDotsScrolling" />
        </div>
      ) : (
        commands.map((command: any, i: number) => (
          <Command key={i} command={command} />
        ))
      )}
    </>
  );
}
