import { Link, NavLink } from '@remix-run/react';

type TabsProps = {
  children: React.ReactNode;
};

export function Tabs({ children }: TabsProps) {
  return (
    <div className="tabs-wrapper">
      <div className="tabs">{children}</div>
    </div>
  );
}

type TabProps = {
  label: string;
  to: string;
};

export function Tab({ label, to }: TabProps) {
  return (
    <NavLink to={to} className="tab">
      {label}
    </NavLink>
  );
}
