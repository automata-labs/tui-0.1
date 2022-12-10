import React, { useState } from 'react';
import { useInterval } from 'react-use';

export const SpinnerContext = React.createContext({});

type SpinnerProviderProps = {
  children: React.ReactNode;
};

export function SpinnerProvider({ children }: SpinnerProviderProps) {
  const lineFrames = ['-', '\\', '|', '/'];
  const dottedFrames = ['.....', ':....', '.:...', '..:..', '...:.', '....:'];
  const longDottedFrames = [
    // '..........',
    ':.........',
    '.:........',
    '..:.......',
    '...:......',
    '....:.....',
    '.....:....',
    '......:...',
    '.......:..',
    '........:.',
    // '.........:',
    // '..........',
    '.........:',
    '........:.',
    '.......:..',
    '......:...',
    '.....:....',
    '....:.....',
    '...:......',
    '..:.......',
    '.:........',
    // ':.........',
  ];
  const simpleDotsScrolling = ['.  ', '.. ', '...', ' ..', '  .', '   '].map(
    (frame) => frame.replace(/\s/g, '&nbsp;')
  );
  const star = ['✶', '✸', '✹', '✺', '✹', '✷'];
  const bouncingBar = [
    '[    ]',
    '[=   ]',
    '[==  ]',
    '[=== ]',
    '[ ===]',
    '[  ==]',
    '[   =]',
    '[    ]',
    '[   =]',
    '[  ==]',
    '[ ===]',
    '[====]',
    '[=== ]',
    '[==  ]',
    '[=   ]',
  ].map((frame) => frame.replace(/\s/g, '&nbsp;'));
  const grenade = [
    '،  ',
    '′  ',
    ' ´ ',
    ' ‾ ',
    '  ⸌',
    '  ⸊',
    '  |',
    '  ⁎',
    '  ⁕',
    ' ෴ ',
    ' _ ',
    ' . ',
    '   ',
    '   ',
  ].map((frame) => frame.replace(/\s/g, '&nbsp;'));

  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 100);

  return (
    <SpinnerContext.Provider
      value={{
        line: lineFrames[count % lineFrames.length],
        dotted: dottedFrames[count % dottedFrames.length],
        simpleDotsScrolling:
          simpleDotsScrolling[count % simpleDotsScrolling.length],
        star: star[count % star.length],
        bouncingBar: bouncingBar[count % bouncingBar.length],
        grenade: grenade[count % grenade.length],
        longDottedFrames: longDottedFrames[count % longDottedFrames.length],
      }}
    >
      {children}
    </SpinnerContext.Provider>
  );
}
