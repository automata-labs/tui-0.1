import { Link } from '@remix-run/react';
import { clsx } from 'clsx';
import { useSearch } from '~/contexts/search';

type SearchResultProps = {
  value: any;
  type: string;
  to: string;
  active: boolean;
  image: React.ReactNode;
  title: React.ReactNode;
  subtitle: React.ReactNode;
  secondaryTitle: React.ReactNode;
  secondarySubtitle: React.ReactNode;
};

export default function SearchResult({
  value,
  type,
  to,
  active,
  image,
  title,
  subtitle,
  secondaryTitle,
  secondarySubtitle,
}: SearchResultProps) {
  const { select, getIdentifier, reset, close } = useSearch() as any;

  return (
    <Link
      to={to}
      className={clsx(['search-result', active && 'active'])}
      onMouseEnter={() => {
        select(getIdentifier(value));
      }}
      onMouseLeave={() => {
        select(null);
      }}
      onClick={() => {
        reset();
        close();
      }}
    >
      <div
        className={clsx([
          'search-result-image-wrapper',
          type === 'token' && 'search-result-image-wrapper--round',
        ])}
      >
        {image}
      </div>
      <div className="search-result-main">
        <div className="search-result-main-title">{title}</div>
        <div className="search-result-main-subtitle">{subtitle}</div>
      </div>
      <div className="search-result-secondary">
        <div className="search-result-secondary-title">{secondaryTitle}</div>
        <div className="search-result-secondary-subtitle">
          {secondarySubtitle}
        </div>
      </div>
    </Link>
  );
}
