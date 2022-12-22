import Spinner from './spinner';

export default function Text({ loading, kind, text }: any) {
  if (loading) {
    return <Spinner kind={kind} />
  }

  return <>{text}</>;
}
