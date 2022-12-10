import { useNavigate, useSearchParams } from '@remix-run/react';
import React, { useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import useMousetrap from '~/hooks/useMousetrap';

export const TerminalContext = React.createContext({});

type TerminalProviderProps = {
  children: React.ReactNode;
};

export function TerminalProvider({ children }: TerminalProviderProps) {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [index, setIndex] = useState<number | null>(null);
  const [length, setLength] = useState(0);
  const [selected, setSelected] = useState({}) as any;
  const [anchor, setAnchor] = useState('');

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { goto } = useGoto();

  const launch = (to?: string) => {
    if (to) {
      goto(to);
    } else if (anchor) {
      goto(anchor);
    }
    
    setIndex(0);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const toggle = (e: Event) => {
    if (visible) hide();
    else launch();
  };

  const increment = () => {
    if (typeof index === 'number') {
      setIndex((index + 1) % length);
    } else {
      setIndex(0);
    }
  };

  const decrement = () => {
    if (typeof index === 'number') {
      if (index === 0) {
        setIndex(Math.max(length - 1, 0));
      } else {
        setIndex(index - 1);
      }
    } else {
      setIndex(Math.max(length - 1, 0));
    }
  };

  const run = () => {
    if (selected?.kind === 'log') {
      console.log(selected);
      hide();
    }

    if (selected?.kind === 'navigate') {
      navigate(selected?.to);
      hide();
    }

    if (selected?.kind === 'goto') {
      goto(selected?.to);
      setIndex(0);
    }

    if (selected?.kind === 'form-checkbox') {
      if (!searchParams.getAll(selected?.key).includes(selected?.value)) {
        searchParams.append(selected?.key, selected?.value);
      } else {
        const values = searchParams.getAll(selected?.key).filter(value => value !== selected?.value);
        searchParams.delete(selected?.key);

        for (const value of values) {
          searchParams.append(selected?.key, value);
        }
      }

      setSearchParams(searchParams, { replace: true });
    }

    if (selected?.kind === 'href' && selected?.to) {
      hide();

      try {
        const url = new URL(selected?.to);
        window.open(url.toString(), '_newtab');
      } catch (e) {
        console.log(e);
      }
    }
  };

  useMousetrap(['mod+k'], toggle);

  return (
    <TerminalContext.Provider
      value={{
        visible,
        setVisible,
        prompt,
        setPrompt,
        index,
        setIndex,
        length,
        setLength,
        selected,
        setSelected,
        anchor,
        setAnchor,

        launch,
        hide,
        toggle,

        increment,
        decrement,

        goto,
        run,
      }}
    >
      {children}
    </TerminalContext.Provider>
  );
}

export function useTerminal() {
  const context = useContext(TerminalContext);

  if (context === undefined) {
    throw new Error('`useTerminal` must be within a TerminalProvider');
  }

  return context;
}

export function useGoto() {
  const history = useHistory();

  const goto = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );

  return { goto };
}
