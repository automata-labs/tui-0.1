import { useParams } from '@remix-run/react';
import { useEffect } from 'react';
import { useTerminal } from '~/contexts/terminal-context';
import useCommands from '~/hooks/useCommands';
import useSources from '~/hooks/useSources';
import { getSource } from '~/utils/constants';
import Command from '../components/command';

export default function Sources() {
  const { address } = useParams();
  const { prompt, index, setLength, setSelected } = useTerminal() as any;
  const { data } = useSources(address);

  const format = data.map((value: any) => ({
    kind: 'form-checkbox',
    key: 'source',
    value: value?.source,
    icon: getSource(value?.source).icon,
    text: getSource(value?.source).text,
    details: `${value?.count} items`,
  }));

  const { commands } = useCommands(prompt, format);

  useEffect(() => {
    setLength(commands?.length);
  }, [commands?.length]);

  useEffect(() => {
    setSelected(commands[index]);
  }, [index, commands?.length]);

  return (
    <>
      {commands.map((command: any, i: number) => (
        <Command key={i} command={command} />
      ))}
    </>
  );
}
