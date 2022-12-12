import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import { useTerminal } from '~/contexts/terminal-context';
import useTrait from '~/hooks/useTrait';
import useCommands from '~/hooks/useCommands';
import Command from '../components/command';

export default function Trait() {
  const { address, key } = useParams() as any;
  const { prompt, index, setLength, setSelected } = useTerminal() as any;
  const {
    data: trait,
    loading,
    fetching,
    hasNextPage,
    fetchNextPage,
  } = useTrait(address, key) as any;

  const values = trait?.values
    ? trait?.values?.map((value: any) => ({
        kind: 'form-checkbox',
        key: `attributes[${key}]`,
        value: value?.value,
        icon: null,
        text: value?.value,
        details: (
          <div className="terminal-command-details-text">
            {value?.count} items
          </div>
        ),
      }))
    : [];

  const { commands } = useCommands(prompt, values) as any;
  const [ref, { entry }] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage]);

  useEffect(() => {
    setLength(commands?.length);
  }, [commands?.length]);

  useEffect(() => {
    setSelected(commands[index]);
  }, [index, loading, commands?.length]);

  return (
    <>
      {loading ? (
        <div className="center pad-1x">
          <Spinner kind="simpleDotsScrolling" />
        </div>
      ) : (
        <>
          {commands.map((command: any, i: number) => (
            <Command key={i} command={command} />
          ))}
          {trait?.kind === 'range' && hasNextPage && (
            <div ref={ref}>
              <div className="terminal-load-more-area center">
                {fetching && <Spinner kind="simpleDotsScrolling" />}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
