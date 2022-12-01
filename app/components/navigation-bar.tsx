import { Link } from '@remix-run/react';
import styled from 'styled-components';

export function NavigationBar() {
  return (
    <nav className="navigation-bar">
      <div className="navigation-bar-inner">
        <Link to="/">Telescope</Link>
        <div className="navigation-bar-middleware">
          <input className="input navigation-bar-search" placeholder="Search..." />
        </div>
        <div className="navigation-bar-right">
          <div className="button theme-button">
            <div style={{ gridColumn: 2, gridRow: 2, width: '100%', background: '#50da4b' }}></div>
            <div style={{ gridColumn: 2, gridRow: 1, width: '100%', background: '#fe6e3c' }}></div>
            <div style={{ gridColumn: 1, gridRow: 2, width: '100%', background: '#3c46ff' }}></div>
            <div style={{ gridColumn: 1, gridRow: 1, width: '100%', background: '#41ffff' }}></div>
          </div>
          <button className="button">Connect Wallet</button>
        </div>
      </div>
      <div className="divider"></div>
    </nav>
  );
}
