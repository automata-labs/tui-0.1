import { Link as TerminalLink, useParams } from 'react-router-dom';

import Spinner from '~/components/spinner';
import useCollection from '~/hooks/useCollection';

export default function CollectionCrumb() {
  const { address } = useParams() as any;
  const { data, loading } = useCollection(address);

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <TerminalLink className="breadcrumb-icon" to={`/collection/${address}`}>
        <div
          className="breadcrumb-icon-image"
          style={
            data?.image && {
              background: `url(${data?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          }
        >
          {loading && <Spinner kind="line" />}
        </div>
        <div className="breadcrumb">
          {loading ? <Spinner kind="simpleDotsScrolling" /> : data?.name}
        </div>
      </TerminalLink>
    </>
  );
}
