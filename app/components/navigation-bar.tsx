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
            <div style={{ width: 8, height: 8, background: '#41ffff' }}></div>
            <div style={{ width: 8, height: 8, background: '#50da4b' }}></div>
            <div style={{ width: 8, height: 8, background: '#fe6e3c' }}></div>
            <div style={{ width: 8, height: 8, background: '#3c46ff' }}></div>
          </div>
          <button className="button">Connect Wallet</button>
        </div>
      </div>
      <div className="divider"></div>
    </nav>
  );
}
