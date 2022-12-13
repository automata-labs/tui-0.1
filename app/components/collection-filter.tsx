import { useSearchParams } from '@remix-run/react';

import Icon from '~/components/icon';
import { getSource } from '~/utils/constants';

export default function CollectionFilter({ searchParam }: any) {
  const [searchParams, setSearchParams] = useSearchParams();

  const fullkey = searchParam[0] || '';
  const value = searchParam[1] || '';

  if (fullkey.substring(0, 10) === 'attributes') {
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
  } else if (fullkey === 'source') {
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
        Platform: {getSource(value).text} <Icon kind="x" />
      </button>
    );
  }

  return <></>;
}
