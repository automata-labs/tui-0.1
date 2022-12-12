import { Link, useSearchParams } from '@remix-run/react';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { Link as MemoryLink } from 'react-router-dom';

import { useTerminal } from '~/contexts/terminal-context';
import Icon from './icon';

export default function Command({ command }: any) {
  const { index, setIndex, hide } = useTerminal() as any;
  const [searchParams, setSearchParams] = useSearchParams();

  if (command?.kind === 'log') {
    return (
      <div
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => {
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

  if (command?.kind === 'goto') {
    return (
      <MemoryLink
        to={command?.to}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
      >
        <Icon kind={command?.icon} />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
        {command?.details && (
          <div className="terminal-command-details">{command?.details}</div>
        )}
      </MemoryLink>
    );
  }

  if (command?.kind === 'navigate') {
    return (
      <Link
        to={command?.to}
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
      >
        <Icon kind={command?.icon} />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
      </Link>
    );
  }

  if (command?.kind === 'form-checkbox') {
    return (
      <label
        className={clsx([
          'terminal-command',
          index === command?.id && 'active',
        ])}
        onMouseMove={() => {
          setIndex(command?.id);
        }}
        onMouseLeave={() => {
          setIndex(null);
        }}
        htmlFor={command?.value}
      >
        <input
          type="checkbox"
          id={command?.value}
          name={command?.key}
          value={command?.value}
          onChange={(e) => {
            if (e.target.checked) {
              searchParams.append(command?.key, command?.value);
            } else {
              const values = searchParams
                .getAll(command?.key)
                .filter((value) => value !== command?.value);
              searchParams.delete(command?.key);

              for (const value of values) {
                searchParams.append(command?.key, value);
              }
            }

            setSearchParams(searchParams, { replace: true });
          }}
          checked={searchParams.getAll(command?.key).includes(command?.value)}
        />
        <div style={{ paddingTop: 1 }}>{command?.text}</div>
        {command?.details && (
          <div className="terminal-command-details">{command?.details}</div>
        )}
      </label>
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
        onMouseMove={() => {
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
