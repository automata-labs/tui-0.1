import { animated, easings, useTransition } from '@react-spring/web';
import { useMatches } from '@remix-run/react';
import Icon from '~/components/icon';
import { Tabs } from '~/components/tabs';

export default function Breadcrumbs() {
  const matches = useMatches();

  return (
    <>
      {matches
        .filter((match) => match.handle && match.handle.breadcrumb)
        .map((match, i) => match?.handle?.breadcrumb(match, i))}
    </>
  );
}

export function TabsModule({ logo }: any) {
  const matches = useMatches();
  const transitions = useTransition(logo, {
    from: { opacity: 0, width: '0px' },
    enter: { opacity: 1, width: '32px' },
    leave: { opacity: 0, width: '0px' },
    config: {
      duration: 300,
      easing: easings.easeOutExpo,
    },
  });

  const tabs = matches
    .filter((match) => match.handle && match.handle.tabs)
    .map((match, index) => match?.handle?.tabs(match, logo));

  return tabs?.length > 0 ? (
    <Tabs>
      {transitions(
        (styles, item) =>
          item && (
            <animated.div style={{ ...styles }}>
              <Icon kind="eclipse" />
            </animated.div>
          ),
      )}

      {tabs}
    </Tabs>
  ) : (
    <></>
  );
}
