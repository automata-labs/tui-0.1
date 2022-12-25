import Image from '../image';
import styles from './styles.css';

export const links = () => [{ rel: 'stylesheet', href: styles }];

export default function PairIcon({ token0, token1 }: any) {
  return (
    <div className="flex relative" style={{ width: 30, height: 30 }}>
      <div
        className="pair-icon-wrapper absolute"
        style={{ width: 20, height: 20, top: 10, zIndex: 10 }}
      >
        <Image src={token0?.logo} />
      </div>
      <div
        className="pair-icon-wrapper absolute"
        style={{ width: 20, height: 20, left: 10 }}
      >
        <Image src={token1?.logo} />
      </div>
    </div>
  );
}
