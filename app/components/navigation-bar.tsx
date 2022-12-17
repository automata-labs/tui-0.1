import { easings, useTransition } from '@react-spring/web';
import { Link } from '@remix-run/react';
import { useIntersectionObserver } from 'react-intersection-observer-hook';

import Search from './search';
import Terminal from '~/terminal/terminal';
import { useKernel } from '~/contexts/kernel';
import Breadcrumbs, { TabsModule } from '~/contexts/breadcrumbs';
import { useEffect, useState } from 'react';

export function NavigationBar() {
  const { visible } = useKernel() as any;
  const [ref, { entry }] = useIntersectionObserver();
  const [showLogo, setShowLogo] = useState(false);

  const transitions = useTransition(visible, {
    from: { opacity: 0, scale: 0.95 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0.95 },
    config: {
      duration: visible ? 200 : 400,
      easing: easings.easeOutExpo,
    },
  });

  useEffect(() => {
    if (entry?.isIntersecting === false) {
      setShowLogo(true);
    } else {
      setShowLogo(false);
    }
  }, [entry?.isIntersecting]);

  return (
    <>
      <nav ref={ref} className="globware">
        <div className="globware-grid">
          <div className="globware-left">
            <Link to="/">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 16C12.4183 16 16 12.4183 16 8C16 7.99291 16 7.98582 16 7.97873C15.9899 11.3943 13.2179 14.16 9.8 14.16C6.37583 14.16 3.6 11.3842 3.6 7.96C3.6 4.53583 6.37583 1.76 9.8 1.76C13.1257 1.76 15.8399 4.37852 15.9932 7.66634C15.8182 3.4028 12.3065 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
                  fill="white"
                />
              </svg>
            </Link>

            <Breadcrumbs />
          </div>

          <div className="globware-middle">
            <Search />
          </div>

          <div className="globware-right">
            <Terminal transitions={transitions} />
            <button className="button">Connect Wallet</button>
          </div>
        </div>
      </nav>

      <div className="globware-divider"></div>

      <div style={{ height: 44 }}></div>
      <TabsModule logo={showLogo} />
    </>
  );
}
