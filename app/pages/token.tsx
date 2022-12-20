import { useParams } from '@remix-run/react';
import { Tab } from '~/components/tabs';

export const handle = {
  tabs: (_: any, logo: boolean) => <TabsBar logo={logo} />,
};

function TabsBar({ logo }: any) {
  const { address } = useParams() as any;

  return (
    <>
      <Tab to={`/token/${address}`} label="Items" />
      <Tab to={`/token/${address}/holders`} label="Holders" />
    </>
  );
}

export default function Page() {
  const { address } = useParams() as any;

  return <main className="page">token! {address}</main>;
}
