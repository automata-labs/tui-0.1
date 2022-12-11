import { Link } from '@remix-run/react';

import Search from './search';
import Terminal from '~/terminal/terminal-root';
import { useTerminal } from '~/contexts/terminal-context';
import { animated, easings, useTransition } from '@react-spring/web';
import { useState } from 'react';

export function NavigationBar() {
  const { visible } = useTerminal() as any;
  const [finality, setFinality] = useState(visible) as any;

  const transitions = useTransition(visible, {
    from: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.95 },
    config: {
      // duration: visible ? 350 : 200,
      // easing: visible ? easings.easeOutExpo : easings.easeInOutExpo,
      duration: 200,
      easing: easings.easeOutExpo,
    },
    onRest: () => {
      setFinality(visible);
    },
  });

  return transitions((styles, item) => {
    return (
      <animated.nav
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
      </animated.nav>
    );
  });
}
