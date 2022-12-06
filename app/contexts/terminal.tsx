import React, { useContext, useState } from 'react';

import useMousetrap from '~/hooks/useMousetrap';

export const TerminalContext = React.createContext({});

type TerminalProviderProps = {
  children: React.ReactNode;
};

export function TerminalProvider({ children }: TerminalProviderProps) {
  const [show, setShow] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [options, setOptions] = useState([]);

  const launch = () => {
    setShow(true);
  };

  const hide = () => {
    setShow(false);
  };

  const toggle = () => {
    console.log('ok')
    if (show) {
      hide();
    } else {
      launch();
    }
  };

  const setTerminal = ({ breadcrumbs, options }: any) => {
    setBreadcrumbs(breadcrumbs);
    setOptions(options);
  };

  useMousetrap(['mod+k'], toggle);

  const contextValue = {
    setTerminal,

    visible: show,
    launch,
    hide,

    breadcrumbs,
    setBreadcrumbs,
    options,
    setOptions,
  };

  return (
    <TerminalContext.Provider value={contextValue}>
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
