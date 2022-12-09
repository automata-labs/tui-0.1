import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useTraits from '~/hooks/useTraits';
import useCommands from '~/hooks/useCommands';
import Command from '../components/command';

export default function Traits() {
  const { address } = useParams() as any;
  const { data, loading } = useTraits(address);
  const { index, setLength, setSelected } = useTerminal() as any;

  const { prompt } = useTerminal() as any;
  const { commands } = useCommands(
    prompt,
    data.map((trait: any) => ({
      kind: 'goto',
      icon: null,
      text: trait?.key,
      to: `/collection/${address}/trait/${trait?.key}`,
    }))
  ) as any;

  useEffect(() => {
    setLength(commands?.length);
  }, [commands?.length]);

  useEffect(() => {
    setSelected(commands[index]);
  }, [index, commands?.length]);

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
