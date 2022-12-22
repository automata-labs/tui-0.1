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
    return <span>{line}</span>;
  } else if (kind === 'dotted') {
    return <span>{dotted}</span>;
  } else if (kind === 'simpleDotsScrolling') {
    return (
      <span dangerouslySetInnerHTML={{ __html: simpleDotsScrolling }}></span>
    );
  } else if (kind === 'star') {
    return <span dangerouslySetInnerHTML={{ __html: star }}></span>;
  } else if (kind === 'bouncingBar') {
    return <span dangerouslySetInnerHTML={{ __html: bouncingBar }}></span>;
  } else if (kind === 'grenade') {
    return <span dangerouslySetInnerHTML={{ __html: grenade }}></span>;
  } else if (kind === 'longDottedFrames') {
    return <span dangerouslySetInnerHTML={{ __html: longDottedFrames }}></span>;
  }

  return <div>none.</div>;
}
