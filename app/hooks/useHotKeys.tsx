import mousetrap from 'mousetrap';
import { useEffect, useRef } from 'react';

/**
 * Use mousetrap hook
 *
 * @param  {(string | string[])} handlerKey - A key, key combo or array of combos according to Mousetrap documentation.
 * @param  { function } handlerCallback - A function that is triggered on key combo catch.
 * @param  { string } keyType - A string that specifies the type of event to listen for. It can be 'keypress', 'keydown' or 'keyup'.
 */
export default (handlerKey: string | string[], handlerCallback: Function) => {
  let actionRef = useRef<Function>();
  actionRef.current = handlerCallback;

  useEffect(() => {
    mousetrap.bind(handlerKey, (evt, combo) => {
      console.log(evt);
      typeof actionRef.current === 'function' && actionRef.current(evt, combo);
    });

    return () => {
      mousetrap.unbind(handlerKey);
    };
  }, [handlerKey]);
};
