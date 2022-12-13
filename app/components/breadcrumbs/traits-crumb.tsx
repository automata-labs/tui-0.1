import { Link as TerminalLink, useParams } from 'react-router-dom';

export default function TraitsCrumb() {
  const { address } = useParams() as any;

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <TerminalLink className="breadcrumb" to={`/collection/${address}/traits`}>
        Filter by "Traits"
      </TerminalLink>
    </>
  );
}
