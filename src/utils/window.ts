import type { Store } from 'redux';

import { focused } from '../store/window/actions';

export function initWindowBlurHandler(store: Store) {
  if (typeof window === 'undefined') return;

  window.onblur = function() {
    store.dispatch(focused(false));
  };
}

export function initWindowFocusHandler(store: Store) {
  if (typeof window === 'undefined') return;
  
  window.onfocus = function() {
    const favicon = document.getElementById('nobsc-favicon') as HTMLLinkElement | null;
    if (!favicon) return;
    favicon.href = "/nobsc-normal-favicon.png";
    store.dispatch(focused(true));
  };
}
