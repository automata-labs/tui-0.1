import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import Command from '~/components/terminal/command';
import { useKernel } from '~/contexts/kernel';
import useCommands from '~/hooks/useCommands';
import useNFT from '~/hooks/useNFT';

export default function DisplayCommands() {
  const { address, id } = useParams() as any;
  const { data, loading } = useNFT(address, id);

  const { prompt } = useKernel() as any;
  const { commands } = useCommands(prompt, [
    {
      kind: 'none',
      icon: 'fullscreen',
      text: 'Show Fullscreen',
    },
    {
      kind: 'none',
      icon: 'arrow-right',
      text: 'Go to Owner',
      to: `/account/${data?.owner}`,
    },
    {
      kind: 'link',
      icon: 'arrow-right',
      text: 'Go to Collection',
      args: {
        to: `/collection/${address}`,
      },
    },
    {
      kind: 'href',
      icon: 'opensea',
      text: 'View on OpenSea ↗',
      args: {
        href: `https://opensea.io/assets/ethereum/${data?.contract}/${data?.id}`,
      }
    },
    {
      kind: 'href',
      icon: 'etherscan',
      text: 'View on Etherscan ↗',
      args: {
        href: `https://etherscan.io/address/${data?.contract}`,
      }
    },
  ]) as any;

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
