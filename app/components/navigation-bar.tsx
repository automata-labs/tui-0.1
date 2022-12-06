import { useClickOutside, useDebouncedState } from '@react-hookz/web';
import { Link } from '@remix-run/react';
import { useRef, useState } from 'react';
import Search from './search';

export function NavigationBar() {
  // const [show, setShow] = useState(false);
  // const [value, setValue] = useState('');
  // const [search, setSearch] = useDebouncedState('', 75, 0);

  // const ref = useRef(null);
  // useClickOutside(ref, () => setShow(false));

  // const hide = () => {
  //   setShow(false);
  //   setValue('');
  //   setSearch('');
  // };

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
          <button className="button">{'>'}</button>
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
