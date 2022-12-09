import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useCollection from '~/hooks/useCollection';
import useCommands from '~/hooks/useCommands';
import useTraits from '~/hooks/useTraits';
import Command from '../components/command';

export default function Collection() {
  const { address } = useParams() as any;
  const { data, loading } = useCollection(address);
  const { index, setLength, setSelected } = useTerminal() as any;

  // pre-loading traits
  const {} = useTraits(address);

  const { prompt } = useTerminal() as any;
  const { commands } = useCommands(prompt, [
    {
      kind: 'goto',
      icon: 'filter',
      text: 'Filter by "Traits"',
      to: `/collection/${address}/trait`,
    },
    ...(data?.slug ? [
      {
        kind: 'href',
        icon: 'opensea',
        text: 'View on OpenSea ↗',
        to: `https://opensea.io/collection/${data?.slug}`,
      },
    ] : []),
    {
      kind: 'href',
      icon: 'etherscan',
      text: 'View on Etherscan ↗',
      to: `https://etherscan.io/address/${address}`,
    },
  ]) as any;

  useEffect(() => {
    setSelected(commands[index]);
  }, [index]);

  useEffect(() => {
    setLength(commands?.length);
  }, [commands?.length]);

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
