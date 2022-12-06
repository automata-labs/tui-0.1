import React, { useContext, useState } from 'react';

import useMousetrap from '~/hooks/useMousetrap';

export const LauncherContext = React.createContext({});

type LauncherProviderProps = {
  children: React.ReactNode;
};

export function LauncherProvider({ children }: LauncherProviderProps) {
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

  const setLauncher = ({ breadcrumbs, options }: any) => {
    setBreadcrumbs(breadcrumbs);
    setOptions(options);
  };

  useMousetrap(['mod+k'], toggle);

  const contextValue = {
    setLauncher,

    visible: show,
    launch,
    hide,

    breadcrumbs,
    setBreadcrumbs,
    options,
    setOptions,
  };

  return (
    <LauncherContext.Provider value={contextValue}>
      {children}
    </LauncherContext.Provider>
  );
}

export function useLauncher() {
  const context = useContext(LauncherContext);

  if (context === undefined) {
    throw new Error('`useLauncher` must be within a LauncherProvider');
  }

  return context;
}
