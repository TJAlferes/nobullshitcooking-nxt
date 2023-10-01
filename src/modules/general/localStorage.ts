export function getItem(key: string) {
  if (typeof window === 'undefined') return;
  const item = localStorage.getItem(key);
  if (!item) return undefined;
  return JSON.parse(item);
}

export function setItem(key: any, value: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

export function removeItem(key: string) {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(JSON.stringify(key));
}

export function clear() {
  if (typeof window === 'undefined') return;
  localStorage.clear();
}
