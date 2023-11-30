export function getItem(key: string) {
  if (typeof window === 'undefined') return false;
  const item = window.localStorage.getItem(JSON.stringify(key));
  if (!item || item === 'undefined') return false;
  return JSON.parse(item);
}

export function setItem(key: any, value: any) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export function removeItem(key: string) {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(JSON.stringify(key));
}

export function clear() {
  if (typeof window === 'undefined') return;
  window.localStorage.clear();
}
