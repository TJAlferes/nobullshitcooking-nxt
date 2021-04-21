import { RootState } from '../store/rootReducer';

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return;

  const item = localStorage.getItem(key);

  if (!item) return undefined;  // sufficient?

  return JSON.parse(item);
}

export function setStorageItem(key: any, value: any) {  // is this used?
  if (typeof window === 'undefined') return;

  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export function removeStorageItem(key: string) {  // this is used
  if (typeof window === 'undefined') return;

  localStorage.removeItem(JSON.stringify(key));
}

export function clearStorage() {
  if (typeof window === 'undefined') return;

  localStorage.clear();
}

export function loadFromLocalStorage() {
  if (typeof window === 'undefined') return;

  try {

    const item = localStorage.getItem('appState');

    if (!item) return undefined;  // sufficient?

    return JSON.parse(item);

  } catch (err) {

    console.log(err);

    return undefined;

  }
}

export function saveToLocalStorage(state: RootState) {  // correct type?
  if (typeof window === 'undefined') return;

  try {

    localStorage.setItem('appState', JSON.stringify(state));

  } catch (err) {

    console.log(err);
    
  }
}