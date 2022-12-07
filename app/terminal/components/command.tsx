import clsx from 'clsx';
import { Link as MemoryLink } from 'react-router-dom';
import { useTerminal } from '~/contexts/terminal-context';

import Icon from './icon';

export default function Command({ command }: any) {
  const { index, setIndex, hide } = useTerminal() as any;

  if (command?.kind === 'log') {
    return (
      <div
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseEnter={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
      >
        <Icon kind={command?.icon} />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
      </div>
    );
  }

  if (command?.kind === 'navigate') {
    return (
      <MemoryLink
        to={command?.to}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseEnter={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
      >
        <Icon kind={command?.icon} />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
      </MemoryLink>
    );
  }

  if (command?.kind === 'href' && command?.to) {
    return (
      <a
        href={command?.to}
        target="_newtab"
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseEnter={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
        onClick={() => {
          hide();
        }}
      >
        <Icon kind={command?.icon} />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
      </a>
    );
  }

  return <></>;
}
