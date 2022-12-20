import Image from '../image';
import Spinner from '../spinner';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function TokenIcon({ image, text, loading }: any) {
  return (
    <div className="token-icon">
      <div className="token-icon-img-wrapper">
        {loading ? (
          <Spinner kind="line" />
        ) : (
          <Image className="token-icon-img" src={image} />
        )}
      </div>
      <div className="token-icon-text">{text}</div>
    </div>
  );
}
