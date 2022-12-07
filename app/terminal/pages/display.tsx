import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useCommands from '~/hooks/useCommands';
import useNFT from '~/hooks/useNFT';
import Command from '../components/command';

export default function Display() {
  const { address, id } = useParams() as any;
  const { data, loading } = useNFT(address, id);
  const { index, setLength, setSelected } = useTerminal() as any;

  const { prompt } = useTerminal() as any;
  const { commands } = useCommands(prompt, [
    {
      kind: 'log',
      icon: 'fullscreen',
      text: 'Show Fullscreen',
      to: '#',
    },
    {
      kind: 'log',
      icon: 'arrow-right',
      text: 'Go to Owner',
      to: `/account/${data?.owner}`,
    },
    {
      kind: 'log',
      icon: 'arrow-right',
      text: 'Go to Collection',
      to: '#',
    },
    {
      kind: 'href',
      icon: 'opensea',
      text: 'View on OpenSea ↗',
      to: `https://opensea.io/assets/ethereum/${data?.contract}/${data?.id}`,
    },
    {
      kind: 'href',
      icon: 'etherscan',
      text: 'View on Etherscan ↗',
      to: `https://etherscan.io/address/${data?.contract}`,
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
