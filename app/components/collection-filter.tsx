import { useSearchParams } from '@remix-run/react';

import Icon from '~/terminal/components/icon';

export default function CollectionFilter({ searchParam }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  let kind;

  const fullkey = searchParam[0] || '';
  const value = searchParam[1] || '';

  if (fullkey.substring(0, 10) === 'attributes') {
    kind = 'attribute';
  }

  if (kind === 'attribute') {
    const key = fullkey.substring(11, fullkey.length - 1);

    return (
      <button
        className="button button--filled collection-filter"
        onClick={() => {
          const values = searchParams
            .getAll(fullkey)
            .filter((v) => v !== value);
          searchParams.delete(fullkey);

          for (const value of values) {
            searchParams.append(fullkey, value);
          }

          setSearchParams(searchParams, { replace: true });
        }}
      >
        {key}: {value} <Icon kind="x" />
      </button>
    );
  }

  return <></>;
}
