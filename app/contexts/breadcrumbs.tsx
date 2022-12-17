import { useMatches } from '@remix-run/react';

export default function Breadcrumbs() {
  const matches = useMatches();

  return (
    <>
      {matches
        // skip routes that don't have a breadcrumb
        .filter((match) => match.handle && match.handle.breadcrumb)
        // render breadcrumbs!
        .map((match, index) => (match?.handle?.breadcrumb(match)))}
    </>
  );
}

export function TabsModule({ logo }: any) {
  const matches = useMatches();

  return (
    <>
      {matches
        // skip routes that don't have a breadcrumb
        .filter((match) => match.handle && match.handle.tabs)
        // render breadcrumbs!
        .map((match, index) => (match?.handle?.tabs(match, logo)))}
    </>
  );
}
