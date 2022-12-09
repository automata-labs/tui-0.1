import * as Dialog from '@radix-ui/react-dialog';
import { animated, useTransition } from '@react-spring/web';
import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useTerminal } from '~/contexts/terminal-context';
import Breadcrumbs from './components/breadcrumbs';
import Collection from './pages/collection';
import Display from './pages/display';
import Trait from './pages/trait';
import Traits from './pages/traits';

export default function Terminal() {
  const {
    visible,
    toggle,
    prompt,
    setPrompt,
    setIndex,
    increment,
    decrement,
    run,
  } = useTerminal() as any;

  const transitions = useTransition(visible, {
    from: { opacity: 0, x: '-50%', y: 6, scale: 0.97 },
    enter: { opacity: 1, x: '-50%', y: 0, scale: 1 },
    leave: { opacity: 0, x: '-50%', y: 6, scale: 0.97 },
    config: {
      mass: 1,
      tension: 365,
      friction: 23,
    },
  });

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  return (
    <Dialog.Root open={visible} onOpenChange={toggle}>
      <Dialog.Trigger className="button">{'>'}</Dialog.Trigger>

      {transitions((styles, item) =>
        item ? (
          <>
            <Dialog.Overlay forceMount asChild className="dialog-overlay">
              <animated.div
                style={{
                  opacity: styles.opacity,
                }}
              />
            </Dialog.Overlay>
            <Dialog.Content forceMount asChild>
              <animated.div style={styles} className="dialog-content">
                <Breadcrumbs />

                <div className="terminal-prompt">
                  <input
                    ref={inputRef}
                    className="input terminal-prompt-input"
                    placeholder="Type in command or search..."
                    value={prompt}
                    onChange={(e) => {
                      setIndex(0);
                      setPrompt(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        increment();
                      }

                      if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        decrement();
                      }

                      if (e.key === 'Enter') {
                        e.preventDefault();
                        run();
                      }

                      if (e.key === 'k' && e.metaKey) {
                        e.preventDefault();
                        toggle();
                      }
                    }}
                  />
                </div>
                <div className="divider"></div>

                <div className="terminal-body">
                  <Switch>
                    <Route exact path="/">
                      <div>root route</div>
                    </Route>

                    <Route path="/nft/:address/:id">
                      <Display />
                    </Route>

                    <Route path="/collection/:address/trait/:key">
                      <Trait />
                    </Route>

                    <Route path="/collection/:address/trait">
                      <Traits />
                    </Route>

                    <Route path="/collection/:address">
                      <Collection />
                    </Route>
                  </Switch>
                </div>
              </animated.div>
            </Dialog.Content>
          </>
        ) : null
      )}
    </Dialog.Root>
  );
}
