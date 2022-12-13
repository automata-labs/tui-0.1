import { Link as TerminalLink, useParams } from 'react-router-dom';

export default function TraitCrumb() {
  const { address, key } = useParams() as any;

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <TerminalLink
        className="breadcrumb"
        to={`/collection/${address}/traits/${key}`}
      >
        {key}
      </TerminalLink>
    </>
  );
}
