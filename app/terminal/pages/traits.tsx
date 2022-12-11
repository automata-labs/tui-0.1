import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useTraits from '~/hooks/useTraits';
import useCommands from '~/hooks/useCommands';
import Command from '../components/command';
import { useSearchParams } from '@remix-run/react';

export default function Traits() {
  const { address } = useParams() as any;
  const { data, loading } = useTraits(address);
  const { index, setLength, setSelected } = useTerminal() as any;

  const [searchParams] = useSearchParams();

  const { prompt } = useTerminal() as any;
  const { commands } = useCommands(
    prompt,
    data.map((trait: any) => ({
      kind: 'goto',
      icon: null,
      to: `/collection/${address}/trait/${trait?.key}`,
      text: trait?.key,
      details: (
        <>
          {searchParams.getAll(`attributes[${trait?.key}]`).length > 0 && (
            <div className=".terminal-command-details-active">
              ({searchParams.getAll(`attributes[${trait?.key}]`).length} active)
            </div>
          )}
          {trait?.attributeCount && (
            <div className="terminal-command-details-text">
              {trait?.attributeCount} attributes
            </div>
          )}
          {Number.isInteger(trait?.minRange) &&
            Number.isInteger(trait?.maxRange) && (
              <div className="terminal-command-details-text">
                {trait?.maxRange} - {trait?.minRange} attributes
              </div>
            )}
        </>
      ),
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
