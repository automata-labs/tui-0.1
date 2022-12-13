import { useParams } from '@remix-run/react';

import Command from '~/components/terminal/command';
import { useKernel } from '~/contexts/kernel';
import useCommands from '~/hooks/useCommands';
import useSources from '~/hooks/useSources';
import { getSource } from '~/utils/constants';

export default function Sources() {
  const { address } = useParams();
  const { prompt } = useKernel() as any;
  const { data } = useSources(address);

  const { commands } = useCommands(
    prompt,
    data.map((value: any) => ({
      kind: 'checkbox',
      icon: getSource(value?.source).icon,
      text: getSource(value?.source).text,
      description: `${value?.count} items`,
      args: {
        key: 'source',
        value: value?.source,
      },
    }))
  );

  return (
    <>
      {commands.map((command: any, i: number) => (
        <Command key={i} command={command} />
      ))}
    </>
  );
}
