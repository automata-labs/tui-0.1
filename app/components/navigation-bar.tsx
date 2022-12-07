import { Link } from '@remix-run/react';
import { useTerminal } from '~/contexts/terminal-context';

import Search from './search';

export function NavigationBar() {
  const { launch } = useTerminal() as any;

  return (
    <nav className="navigation-bar">
      <div className="navigation-bar-inner">
        <div className="navigation-bar-home">
          <Link to="/">Telescope</Link>
        </div>
        <div className="navigation-bar-middleware">
          <Search />
        </div>
        <div className="navigation-bar-right">
          <button className="button" onClick={() => launch()}>
            {'>'}
          </button>
          <div className="button theme-button">
            <div
              style={{
                gridColumn: 2,
                gridRow: 2,
                width: '100%',
                background: '#50da4b',
              }}
            ></div>
            <div
              style={{
                gridColumn: 2,
                gridRow: 1,
                width: '100%',
                background: '#fe6e3c',
              }}
            ></div>
            <div
              style={{
                gridColumn: 1,
                gridRow: 2,
                width: '100%',
                background: '#3c46ff',
              }}
            ></div>
            <div
              style={{
                gridColumn: 1,
                gridRow: 1,
                width: '100%',
                background: '#41ffff',
              }}
            ></div>
          </div>
          <button className="button">Connect Wallet</button>
        </div>
      </div>
    </nav>
  );
}
