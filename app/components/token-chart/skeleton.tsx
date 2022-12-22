import Spinner from '../spinner';

export default function Skeleton({ height }: any) {
  return (
    <div className="flex items-center justify-center w-1" style={{ height, width: '100%' }}>
      <Spinner kind="line" />
    </div>
  );
}
