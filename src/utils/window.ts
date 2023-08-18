import type { Store } from 'redux';

import { focused } from '../store/window/actions';

export function initWindowBlurHandler(store: Store) {
  if (typeof window === 'undefined') {
    return;
  }

  window.onblur = function() {
    store.dispatch(focused(false));
  };
}

export function initWindowFocusHandler(store: Store) {
  if (typeof window === 'undefined') {
    return;
  }
  
  window.onfocus = function() {
    const favicon = document.getElementById('nobsc-favicon') as HTMLLinkElement | null;

    if (!favicon) {
      return;
    }

    favicon.href = "/nobsc-normal-favicon.png";

    store.dispatch(focused(true));
  };
}

/*export function initSearchInputBlurHandler() {
  if (typeof window === 'undefined')   return;
  if (typeof document === 'undefined') return;

  const searchInput =     document.getElementById("search-input") as HTMLInputElement;
  const autosuggestions = document.querySelector(".autosuggestions") as HTMLDivElement;

  searchInput.onblur = function() {
    if (document.activeElement !== autosuggestions) autosuggestions.style.display = "none";
  };
}*/
