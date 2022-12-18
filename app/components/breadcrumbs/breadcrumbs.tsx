import { Route, Link as TerminalLink } from 'react-router-dom';
import CollectionCrumb from '~/components/breadcrumbs/collection-crumb';
import DisplayCrumb from '~/components/breadcrumbs/display-crumb';
import TraitCrumb from '~/components/breadcrumbs/trait-crumb';
import TraitsCrumb from '~/components/breadcrumbs/traits-crumb';

import SortCrumb from './sort-crumb';

export default function Breadcrumbs() {
  return (
    <div className="breadcrumbs">
      <TerminalLink className="breadcrumb" to="/">
        /
      </TerminalLink>

      <Route path="/nft/:address/:id" component={DisplayCrumb} />

      <Route path="/collection/:address" component={CollectionCrumb} />
      <Route path="/collection/:address/sort" component={SortCrumb} />
      <Route path="/collection/:address/traits" component={TraitsCrumb} />
      <Route path="/collection/:address/traits/:key" component={TraitCrumb} />
    </div>
  );
}
