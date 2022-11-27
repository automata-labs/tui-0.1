import React, { useRef, useState } from 'react';
import { useInterval } from 'react-use';

export const SpinnerContext = React.createContext({});

type SpinnerProviderProps = {
  children: React.ReactNode;
}

export function SpinnerProvider({ children }: SpinnerProviderProps) {
  const frames = ['-', '\\', '|', '/'];
  const count = useRef(0);
  const [frame, setFrame] = useState(frames[count.current % 4]);

  useInterval(() => {
    setFrame(frames[count.current % 4]);
    count.current += 1;
  }, 100);

  return <SpinnerContext.Provider value={{ frame }}>{children}</SpinnerContext.Provider>;
}
