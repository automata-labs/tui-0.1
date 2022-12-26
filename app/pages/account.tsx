import { useParams } from '@remix-run/react';

export default function Page() {
  const { address } = useParams();

  return <main className="page">{address}</main>;
}
