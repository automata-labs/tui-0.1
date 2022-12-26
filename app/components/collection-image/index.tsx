import clsx from 'clsx';
import Image from '../image';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function CollectionImage({ large, src, alt }: any) {
  return (
    <div className={clsx('collection-image-wrapper', large && 'collection-image-wrapper--large')}>
      <Image className="collection-image" src={src} alt={alt} />
    </div>
  );
}
