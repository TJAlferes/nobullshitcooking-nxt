export function debounce(cb: Function, delay = 1000) {
  let timeout: NodeJS.Timeout;  // | number | string

  return function (...args: any[]) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  }
}
