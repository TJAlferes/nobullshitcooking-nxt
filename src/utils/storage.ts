import type { RootState } from '../store';

export function getItem(key: string) {
  if (typeof window === 'undefined') {
    return;
  }

  const item = localStorage.getItem(key);

  if (!item) {
    return undefined;
  }

  return JSON.parse(item);
}

export function setItem(key: any, value: any) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export function removeItem(key: string) {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(JSON.stringify(key));
}

export function clear() {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.clear();
}

export function loadFromLocalStorage() {
  if (typeof window === 'undefined') {
    return;
  }

  try {

    const item = localStorage.getItem('appState');

    if (!item) {
      return undefined;
    }

    return JSON.parse(item);

  } catch (err) {

    console.log(err);

    return undefined;
    
  }
}

export function saveToLocalStorage(state: RootState) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem('appState', JSON.stringify(state));
  } catch (err) {
    console.log(err);
  }
}

// do the same for sessionStorage
