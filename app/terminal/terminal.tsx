import * as Dialog from '@radix-ui/react-dialog';
import { animated } from '@react-spring/web';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import Breadcrumbs from '~/components/breadcrumbs/breadcrumbs';
import Collection from '~/components/commands/collection-cmds';
import Display from '~/components/commands/display-cmds';
import Sort from '~/components/commands/sort-cmds';
import Sources from '~/components/commands/sources-cmds';
import Trait from '~/components/commands/trait-cmds';
import Traits from '~/components/commands/traits-cmds';
import { useKernel } from '~/contexts/kernel';

const Overlay = animated(Dialog.Overlay);

export default function Terminal({ transitions }: any) {
  const { visible, toggle, prompt, setPrompt, shortcuts, inputRef } =
    useKernel() as any;

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  return (
    <Dialog.Root open={visible} onOpenChange={toggle}>
      <Dialog.Trigger className="button">{'>'}</Dialog.Trigger>

      {transitions((styles: any, item: any) =>
        item ? (
          <Dialog.Portal forceMount className="dialog-portal">
            <Overlay className="dialog-overlay" style={{ opacity: 0 }} />
            <Dialog.Content>
              <animated.div style={styles} className="dialog-content">
                <Breadcrumbs />

                <div className="terminal-prompt">
                  <input
                    ref={inputRef}
                    className="input terminal-prompt-input"
                    placeholder="Type in command or search..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => shortcuts(e.nativeEvent)}
                  />
                </div>
                <div className="divider"></div>

                <div className="terminal-body">
                  <Switch>
                    <Route exact path="/">
                      <div>root route</div>
                    </Route>

                    <Route exact path="/nft/:address/:id" component={Display} />

                    <Route
                      exact
                      path="/collection/:address"
                      component={Collection}
                    />
                    <Route
                      exact
                      path="/collection/:address/sort"
                      component={Sort}
                    />
                    <Route
                      exact
                      path="/collection/:address/traits"
                      component={Traits}
                    />
                    <Route
                      exact
                      path="/collection/:address/traits/:key"
                      component={Trait}
                    />
                    <Route
                      exact
                      path="/collection/:address/sources"
                      component={Sources}
                    />
                  </Switch>
                </div>
              </animated.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null,
      )}
    </Dialog.Root>
  );
}
