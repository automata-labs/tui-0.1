import { Link as TerminalLink, useParams } from 'react-router-dom';

import useNFT from '~/hooks/useNFT';
import Spinner from '../spinner';

export default function DisplayCrumb() {
  const { address, id } = useParams() as any;
  const { data: nft, loading } = useNFT(address, id);

  return (
    <>
    <div className="breadcrumb-divider">{'>'}</div>
      <TerminalLink className="breadcrumb-icon" to={`/collection/${address}`}>
        <div
          className="breadcrumb-icon-image"
          style={
            nft?.collection?.image && {
              background: `url(${nft?.collection?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          }
        >
          {loading && <Spinner kind="line" />}
        </div>
        <div className="breadcrumb">
          {loading ? <Spinner kind="simpleDotsScrolling" /> : nft?.collection?.name}
        </div>
      </TerminalLink>

      <div className="breadcrumb-divider">{'>'}</div>
      <TerminalLink
        className="breadcrumb"
        to={`/nft/${address}/${id}`}
      >
        {loading ? <Spinner kind="simpleDotsScrolling" /> : nft?.name}
      </TerminalLink>
    </>
  );
}
