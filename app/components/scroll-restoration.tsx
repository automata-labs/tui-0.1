/**
 * @remix-run/react v0.0.0-experimental-9b7f37c9a
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
import { useBeforeUnload, useLocation, useTransition } from '@remix-run/react';
import * as React from 'react';

let STORAGE_KEY = 'positions';
let positions = {};

if (typeof document !== 'undefined') {
  let sessionPositions = sessionStorage.getItem(STORAGE_KEY);

  if (sessionPositions) {
    positions = JSON.parse(sessionPositions);
  }
}
/**
 * This component will emulate the browser's scroll restoration on location
 * changes.
 *
 * @see https://remix.run/api/remix#scrollrestoration
 */

export function ScrollRestoration({ nonce = undefined }) {
  useScrollRestoration();

  return <></>;
}
let hydrated = false;

function useScrollRestoration() {
  let location = useLocation();
  let transition = useTransition();
  let wasSubmissionRef = React.useRef(false);
  let wasPopEventRef = React.useRef(false);

  React.useEffect(() => {
    window.onpopstate = (e) => {
      wasPopEventRef.current = true;
    };
  }, []);

  React.useEffect(() => {
    if (transition.submission) {
      wasSubmissionRef.current = true;
    }
  }, [transition]);
  React.useEffect(() => {
    if (transition.location) {
      positions[location?.key] = window.scrollY;
    }
  }, [transition, location]);
  useBeforeUnload(
    React.useCallback(() => {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(positions));
    }, []),
  );

  if (typeof document !== 'undefined') {
    // eslint-disable-next-line
    React.useLayoutEffect(() => {
      // don't do anything on hydration, the component already did this with an
      // inline script.
      if (!hydrated) {
        hydrated = true;
        return;
      }

      let y = positions[location.key]; // been here before, scroll to it

      if (y != undefined && wasPopEventRef.current) {
        wasPopEventRef.current = false;
        window.scrollTo(0, y);
        return;
      } // try to scroll to the hash

      if (location.hash) {
        let el = document.getElementById(location.hash.slice(1));

        if (el) {
          el.scrollIntoView();
          return;
        }
      } // don't do anything on submissions

      if (wasSubmissionRef.current === true) {
        wasSubmissionRef.current = false;
        return;
      } // otherwise go to the top on new locations

      window.scrollTo(0, 0);
    }, [location]);
  }

  React.useEffect(() => {
    if (transition.submission) {
      wasSubmissionRef.current = true;
    }
  }, [transition]);
}
