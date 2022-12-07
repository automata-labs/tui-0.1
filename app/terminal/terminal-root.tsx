import { useEffect, useRef } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Route, Switch } from 'react-router-dom';
import Breadcrumbs from './components/breadcrumbs';

import { useTerminal } from '../contexts/terminal-context';
import Display from './pages/display';

export default function Terminal() {
  const { visible, hide, prompt, setPrompt, increment, decrement, run } = useTerminal() as any;

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (visible) {
      inputRef?.current?.focus();
    }
  }, [visible]);

  return (
    <Modal
      className="modal"
      backdrop
      animation={false}
      show={visible}
      onHide={() => hide()}
    >
      <div className="terminal">
        <Breadcrumbs />

        <div className="terminal-prompt">
          <div className="terminal-prompt-icon">{'>'}</div>
          <input
            ref={inputRef}
            className="input terminal-prompt-input"
            placeholder="Type in command or search..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
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
          </Switch>
        </div>
      </div>
    </Modal>
  );
}
