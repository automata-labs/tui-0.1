import { useEffect } from 'react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';
import { useParams } from 'react-router-dom';
import Spinner from '~/components/spinner';
import Command from '~/components/terminal/command';
import { useKernel } from '~/contexts/kernel';
import useCommands from '~/hooks/useCommands';
import useTrait from '~/hooks/useTrait';

export default function TraitCommands() {
  const { address, key } = useParams() as any;
  const { prompt } = useKernel() as any;
  const {
    data: trait,
    loading,
    fetching,
    hasNextPage,
    fetchNextPage,
  } = useTrait(address, key) as any;

  const values = trait?.values
    ? trait?.values?.map((value: any) => ({
        kind: 'checkbox',
        text: value?.value,
        description: (
          <div className="terminal-command-details-text">
            {value?.count} items
          </div>
        ),
        args: {
          key: `attributes[${key}]`,
          value: value?.value,
        },
      }))
    : [];

  const { commands } = useCommands(prompt, values) as any;
  const [ref, { entry }] = useIntersectionObserver();

  useEffect(() => {
    if (entry?.isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [entry?.isIntersecting, hasNextPage]);

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
                {!fetching && hasNextPage && (
                  <button
                    className="button button--fullscreen"
                    onClick={fetchNextPage}
                  >
                    Load More
                  </button>
                )}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}
