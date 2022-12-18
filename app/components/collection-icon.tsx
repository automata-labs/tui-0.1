import Image from './image';
import Spinner from './spinner';

export default function CollectionIcon({ image, loading }: any) {
  return (
    <div
      className="collection-icon"
      style={{
        backgroundImage: image ? `url(${image})` : '',
      }}
    >
      {loading && <Spinner kind="line" />}
      {!loading && !image && <Image className="img--fallback" />}
    </div>
  );
}
