import * as Dialog from '@radix-ui/react-dialog';
import { animated } from '@react-spring/web';
import { useEffect, useRef } from 'react';
import { Route, Switch } from 'react-router-dom';

import { useTerminal } from '~/contexts/terminal-context';
import Breadcrumbs from './components/breadcrumbs';
import Collection from './pages/collection';
import Display from './pages/display';
import Sources from './pages/sources';
import Trait from './pages/trait';
import Traits from './pages/traits';

const Overlay = animated(Dialog.Overlay);

export default function Terminal({ styles, item }: any) {
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  return (
    <Dialog.Root open={visible} onOpenChange={toggle}>
      <Dialog.Trigger className="button">{'>'}</Dialog.Trigger>

      {item ? (
        <Dialog.Portal forceMount className="dialog-portal">
          <Overlay
            className="dialog-overlay"
            style={{ opacity: 0 }}
          />
          <Dialog.Content>
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

                  <Route path="/collection/:address/traits/:key">
                    <Trait />
                  </Route>

                  <Route path="/collection/:address/traits">
                    <Traits />
                  </Route>

                  <Route path="/collection/:address/sources">
                    <Sources />
                  </Route>

                  <Route path="/collection/:address">
                    <Collection />
                  </Route>
                </Switch>
              </div>
            </animated.div>
          </Dialog.Content>
        </Dialog.Portal>
      ) : null}
    </Dialog.Root>
  );
}
