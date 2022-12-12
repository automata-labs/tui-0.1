import { Link as MemoryLink, Route, Switch, useParams } from 'react-router-dom';
import Spinner from '~/components/spinner';
import useCollection from '~/hooks/useCollection';
import useNFT from '~/hooks/useNFT';

export default function Breadcrumbs() {
  return (
    <div className="breadcrumbs">
      <MemoryLink className="breadcrumb" to="/">
        /
      </MemoryLink>

      <Switch>
        <Route path="/collection/:address/traits/:key">
          <CollectionTraitBreadcrumbs />
        </Route>
        <Route path="/collection/:address/traits">
          <CollectionTraitsBreadcrumbs />
        </Route>
        <Route path="/collection/:address">
          <CollectionBreadcrumbs />
        </Route>
        <Route path="/nft/:address/:id">
          <DisplayBreadcrumbs />
        </Route>
      </Switch>
    </div>
  );
}

function CollectionBreadcrumbs() {
  const { address } = useParams() as any;
  const { data, loading } = useCollection(address);

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb-icon" to={`/collection/${address}`}>
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
      </MemoryLink>
    </>
  );
}

function CollectionTraitsBreadcrumbs() {
  const { address } = useParams() as any;
  const { data, loading } = useCollection(address);

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb-icon" to={`/collection/${address}`}>
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
      </MemoryLink>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb" to={`/collection/${address}/traits`}>
        Filter by "Traits"
      </MemoryLink>
    </>
  );
}

function CollectionTraitBreadcrumbs() {
  const { address, key } = useParams() as any;
  const { data, loading } = useCollection(address);

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb-icon" to={`/collection/${address}`}>
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
      </MemoryLink>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb" to={`/collection/${address}/traits`}>
        Filter by "Traits"
      </MemoryLink>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb" to={`/collection/${address}/traits/${key}`}>
        {key}
      </MemoryLink>
    </>
  );
}

function DisplayBreadcrumbs() {
  const { address, id } = useParams() as any;
  const { data, loading } = useNFT(address, id) as any;

  return (
    <>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb-icon" to={`/collection/${address}`}>
        <div
          className="breadcrumb-icon-image"
          style={
            data?.collection?.image && {
              background: `url(${data?.collection?.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          }
        >
          {loading && <Spinner kind="line" />}
        </div>
        <div className="breadcrumb">
          {loading ? (
            <Spinner kind="simpleDotsScrolling" />
          ) : (
            data?.collection?.name
          )}
        </div>
      </MemoryLink>
      <div className="breadcrumb-divider">{'>'}</div>
      <MemoryLink className="breadcrumb" to={`/collection/${address}/${id}`}>
        {loading ? <Spinner kind="simpleDotsScrolling" /> : data?.name}
      </MemoryLink>
    </>
  );
}
