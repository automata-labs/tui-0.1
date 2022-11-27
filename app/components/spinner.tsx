import { useContext } from 'react';
import { SpinnerContext } from '~/contexts/spinner';

export default function Spinner() {
  const { frame } = useContext(SpinnerContext) as any;

  return <div>{frame}</div>;
}
