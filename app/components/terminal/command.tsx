import { Link, useSearchParams } from '@remix-run/react';
import clsx from 'clsx';
import { Link as TerminalLink } from 'react-router-dom';

import Icon from '~/components/icon';
import { useKernel } from '~/contexts/kernel';

export default function CommandComponent({ command }: any) {
  const { refs, index, setIndex, hide } = useKernel() as any;
  const [searchParams, setSearchParams] = useSearchParams();

  if (command.kind === 'none') {
    return (
      <div
        ref={(el) => refs.current.set(command?.id, el)}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => setIndex(command?.id)}
      >
        <Icon kind={command.icon} />
        <div style={{ paddingTop: 1 }}>{command.text}</div>

        {command.description}
      </div>
    );
  }

  if (command.kind === 'terminal-link') {
    return (
      <TerminalLink
        ref={(el) => refs.current.set(command?.id, el)}
        to={command.args?.to}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => setIndex(command?.id)}
      >
        <Icon kind={command.icon} />
        <div style={{ paddingTop: 1 }}>{command.text}</div>

        {command.description}
      </TerminalLink>
    );
  }

  if (command.kind === 'link') {
    return (
      <Link
        ref={(el) => refs.current.set(command?.id, el)}
        to={command.args?.to}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => setIndex(command?.id)}
        onClick={() => hide()}
      >
        <Icon kind={command.icon} />
        <div style={{ paddingTop: 1 }}>{command.text}</div>

        {command.description}
      </Link>
    );
  }

  if (command.kind === 'href') {
    return (
      <a
        ref={(el) => refs.current.set(command?.id, el)}
        href={command.args?.href}
        target="_newtab"
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => setIndex(command?.id)}
        onClick={() => hide()}
      >
        <Icon kind={command.icon} />
        <div style={{ paddingTop: 1 }}>{command.text}</div>

        {command.description}
      </a>
    );
  }

  if (command.kind === 'checkbox') {
    const id = command?.id;
    const key = command.args?.key;
    const value = command.args?.value;

    return (
      <label
        ref={(el) => refs.current.set(id, el)}
        className={clsx(['terminal-command', index === id && 'active'])}
        onMouseMove={() => setIndex(id)}
        htmlFor={value}
      >
        <input
          className="checkbox"
          type="checkbox"
          id={value}
          name={key}
          value={value}
          onChange={(e) => {
            if (e.target.checked) {
              searchParams.append(key, value);
            } else {
              const values = searchParams
                .getAll(key)
                .filter((v) => v !== value);
              searchParams.delete(key);

              for (const value of values) {
                searchParams.append(key, value);
              }
            }

            setSearchParams(searchParams, { replace: true });
          }}
          checked={searchParams.getAll(key).includes(value)}
        />
        <div style={{ paddingTop: 1 }}>{command.text}</div>

        {command.details}
      </label>
    );
  }

  return <div>no command match</div>;
}
