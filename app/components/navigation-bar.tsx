import { Link } from '@remix-run/react';

import Search from './search';
import Terminal from '~/terminal/terminal';
import { useKernel } from '~/contexts/kernel';
import { easings, useTransition } from '@react-spring/web';
import { useState } from 'react';

export function NavigationBar() {
  const { visible } = useKernel() as any;
  const [finality, setFinality] = useState(visible) as any;

  const transitions = useTransition(visible, {
    from: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.95 },
    config: {
      duration: visible ? 200 : 400,
      easing: easings.easeOutExpo,
    },
    onRest: () => {
      setFinality(visible);
    },
  });

  return transitions((styles, item) => {
    return (
      <nav
        className="navigation-bar"
        style={{ marginRight: visible || item || finality ? 15 : 0 }}
      >
        <div className="navigation-bar-inner">
          <div className="navigation-bar-home">
            <Link to="/">Telescope</Link>
          </div>
          <div className="navigation-bar-middleware">
            <Search />
          </div>
          <div className="navigation-bar-right">
            <Terminal styles={styles} item={item} />

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
  });
}
