import React, { useContext, useEffect, useState } from 'react';
import useMousetrap from '~/hooks/useMousetrap';

export const LauncherContext = React.createContext({});

type LauncherProviderProps = {
  children: React.ReactNode;
};

export function LauncherProvider({ children }: LauncherProviderProps) {
  const [show, setShow] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState([]);

  const launch = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(false);
  };
  const toggle = () => {
    if (show) {
      hide();
    } else {
      launch();
    }
  };

  useMousetrap(['mod+k'], toggle);

  const contextValue = {
    breadcrumbs,
    setBreadcrumbs,

    visible: show,
    launch,
    hide,
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
