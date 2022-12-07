import React, { useContext, useState } from 'react';
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

  const { goto } = useGoto();

  const launch = () => {
    setIndex(0);
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  const toggle = () => {
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
    }

    if (selected?.kind === 'navigate') {
      goto(selected?.to);
    }

    if (selected?.kind === 'href' && selected?.to) {
      try {
        const url = new URL(selected?.to);
        window.open(url.toString(), '_newtab');
      } catch (e) {
        console.log(e);
      }
    }

    hide();
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

        launch,
        hide,
        toggle,

        increment,
        decrement,

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

  return {
    goto: (path: string) => history.push(path),
  };
}
