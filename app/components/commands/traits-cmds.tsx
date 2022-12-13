import { useSearchParams } from '@remix-run/react';
import { useParams } from 'react-router-dom';

import Command from '~/components/terminal/command';
import Spinner from '~/components/spinner';
import { useKernel } from '~/contexts/kernel';
import useTraits from '~/hooks/useTraits';
import useCommands from '~/hooks/useCommands';

export default function Traits() {
  const { address } = useParams() as any;

  const { data, loading } = useTraits(address);
  const { prompt } = useKernel() as any;
  const [searchParams] = useSearchParams();
  const { commands } = useCommands(
    prompt,
    data.map((trait: any) => ({
      kind: 'terminal-link',
      text: trait?.key,
      description: (
        <div className="terminal-command-description">
          {searchParams.getAll(`attributes[${trait?.key}]`).length > 0 && (
            <div className="terminal-command-description-active">
              ({searchParams.getAll(`attributes[${trait?.key}]`).length} active)
            </div>
          )}
          {trait?.attributeCount && (
            <div className="terminal-command-description-text">
              {trait?.attributeCount} attributes
            </div>
          )}
          {Number.isInteger(trait?.minRange) &&
            Number.isInteger(trait?.maxRange) && (
              <div className="terminal-command-description-text">
                {trait?.maxRange} - {trait?.minRange} attributes
              </div>
            )}
        </div>
      ),
      args: {
        to: `/collection/${address}/traits/${trait?.key}`,
      },
    }))
  ) as any;

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
