import { Store } from 'redux';

import { nobscappWindowFocused } from '../store/nobscapp/actions';

export function initWindowBlurHandler(store: Store) {
  if (typeof window === 'undefined') return;

  window.onblur = function() {
    store.dispatch(nobscappWindowFocused(false));
  };
}

export function initWindowFocusHandler(store: Store) {
  if (typeof window === 'undefined') return;
  
  window.onfocus = function() {
    const nobscFavicon = document.getElementById('nobsc-favicon') as HTMLLinkElement | null;
    if (!nobscFavicon) return;
    nobscFavicon.href = "/nobsc-normal-favicon.png";
    store.dispatch(nobscappWindowFocused(true));
  };
}