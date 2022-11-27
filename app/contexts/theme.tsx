import { useFetcher } from '@remix-run/react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
  MONOKAI = 'monokai',
};

type ThemeContextType = [Theme | null, Dispatch<SetStateAction<Theme | null>>];

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
  specifiedTheme: Theme | null;
};

function fallbackTheme(theme: Theme | null) {
  if (theme) {
    if (Object.values(Theme).includes(theme)) {
      return theme;
    } else {
      return null;
    }
  }
  
  if (typeof document === 'undefined') {
    return null;
  }

  return Theme.DARK;
}

function ThemeProvider({ children, specifiedTheme }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme | null>(fallbackTheme(specifiedTheme));
  const fetcher = useFetcher();
  const fetcherRef = useRef(fetcher);
  const mounted = useRef(false);

  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    if (!theme) {
      return;
    }

    fetcherRef.current.submit(
      { theme },
      { action: 'action/set-theme', method: 'post' }
    );
  }, [theme]);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('`useTheme` must be within a ThemeProvider');
  }

  return context;
}

function isTheme(value: unknown): value is Theme {
  return (
    typeof value === 'string' && Object.values(Theme).includes(value as Theme)
  );
}

export {
  isTheme,
  Theme,
  ThemeProvider,
  useTheme,
};
