import { useNavigate, useSearchParams } from '@remix-run/react';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import useHotKeys from '~/hooks/useHotKeys';

export const KernelContext = React.createContext({});

export function KernelProvider({ children }: { children: React.ReactNode }) {
  const refs = useRef(new Map());
  const inputRef = useRef<HTMLInputElement>(null);

  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [index, setIndex] = useState<number>(0);
  const [anchor, setAnchor] = useState('');
  const [commands, setCommands] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const history = useHistory();
  const navigate = useNavigate();

  const navigateTerminal = useCallback(
    (path: string) => {
      history.push(path);
    },
    [history]
  );

  const launch = (to?: string) => {
    if (to) {
      navigateTerminal(to);
    } else if (anchor) {
      navigateTerminal(anchor);
    }

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

  const select = (i: number) => {
    setIndex(i);
    refs.current.get(i)?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
      inline: 'nearest',
    });
  };

  const init = (anc: string, cmds: any) => {
    setAnchor(anc);
    setCommands(cmds);
  };

  const shortcuts = (e: KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      select((index + 1) % refs.current.size || 0);
    }

    if (e.key === 'ArrowUp') {
      select(index > 0 ? index - 1 : (refs.current.size - 1 ?? 0));
    }

    if (e.key === 'k' && e.metaKey) {
      toggle();
    }

    if (e.key === 'Enter') {
      run(commands[index]);
    }
  };

  const run = (command: any) => {
    if (command.kind === 'terminal-link') {
      navigateTerminal(command.args?.to);
    }

    if (command.kind === 'link') {
      navigate(command.args?.to);
      hide();
    }

    if (command.kind === 'href' && command.args?.href) {
      hide();

      try {
        const url = new URL(command.args?.href);
        window.open(url.toString(), '_newtab');
      } catch (e) {
        console.log(e);
      }
    }

    if (command.kind === 'checkbox') {
      const key = command.args?.key;
      const value = command.args?.value;
      const checked = searchParams.getAll(key).includes(value);

      if (!checked) {
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
    }

    if (command.kind === 'radio') {
      const params = command.args?.params;

      for (const param of params) {
        searchParams.set(param?.key, param?.value);
      }

      hide();
      setSearchParams(searchParams, { replace: true });
    }

    if (command.kind === 'radio-default') {
      for (const param of command.args?.params) {
        searchParams.delete(param?.key);
      }

      hide();
      setSearchParams(searchParams, { replace: true });
    }
  };

  useHotKeys('command+k,ctrl+k', toggle);
  useHotKeys('down', shortcuts);
  useHotKeys('up', shortcuts);
  useHotKeys('enter', shortcuts);

  useEffect(() => {
    select(0);
  }, [prompt]);

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }

    setPrompt('');
    refs.current = new Map();
    setIndex(0);
  }, [location]);

  return (
    <KernelContext.Provider
      value={{
        visible,
        setVisible,
        prompt,
        setPrompt,
        index,
        setIndex,
        anchor,
        setAnchor,
        commands,
        setCommands,

        refs,
        inputRef,

        launch,
        hide,
        toggle,

        navigate,
        init,
        shortcuts,
        run,
      }}
    >
      {children}
    </KernelContext.Provider>
  );
}

export function useKernel() {
  const context = useContext(KernelContext);

  if (context === undefined) {
    throw new Error('`useKernel` must be within a KernelProvider');
  }

  return context;
}
