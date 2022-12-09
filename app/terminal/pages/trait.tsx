import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useTraits from '~/hooks/useTraits';
import useCommands from '~/hooks/useCommands';
import Command from '../components/command';

export default function Trait() {
  const { address, key } = useParams() as any;
  const { data, loading } = useTraits(address);
  const { index, setLength, setSelected } = useTerminal() as any;

  const values = data.find((trait: any) => trait.key === key)?.values?.map((value: any) => ({
    kind: 'log',
    icon: null,
    text: value.value,
    to: `/collection/${address}/trait/${key}`,
  })) ?? [];

  const { prompt } = useTerminal() as any;
  const { commands } = useCommands(
    prompt,
    values,
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
