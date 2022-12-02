import { useContext } from 'react';
import { SpinnerContext } from '~/contexts/spinner';

export default function Spinner({ kind } = { kind: 'line' }) {
  const {
    line,
    dotted,
    simpleDotsScrolling,
    star,
    bouncingBar,
    grenade,
    longDottedFrames,
  } = useContext(SpinnerContext) as any;

  if (kind === 'line') {
    return <div>{line}</div>;
  } else if (kind === 'dotted') {
    return <div>{dotted}</div>;
  } else if (kind === 'simpleDotsScrolling') {
    return (
      <div dangerouslySetInnerHTML={{ __html: simpleDotsScrolling }}></div>
    );
  } else if (kind === 'star') {
    return <div dangerouslySetInnerHTML={{ __html: star }}></div>;
  } else if (kind === 'bouncingBar') {
    return <div dangerouslySetInnerHTML={{ __html: bouncingBar }}></div>;
  } else if (kind === 'grenade') {
    return <div dangerouslySetInnerHTML={{ __html: grenade }}></div>;
  } else if (kind === 'longDottedFrames') {
    return <div dangerouslySetInnerHTML={{ __html: longDottedFrames }}></div>;
  }

  return <div>none.</div>;
}
