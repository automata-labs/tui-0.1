import { Link } from "@remix-run/react";

type TabsProps = {
  children: React.ReactNode;
};

export function Tabs({ children }: TabsProps) {
  return <div className="tabs">{children}</div>;
}

type TabProps = {
  label: string;
  to: string;
}

export function Tab({ label, to }: TabProps) {
  return <Link to={to} className="tab">{label}</Link>;
}
