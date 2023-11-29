/*export function debounce(cb: Function, delay = 1000) {
  let timeout: any;  //NodeJS.Timeout;  // | number | string

  return function (...args: any[]) {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      cb(...args);
    }, delay);
  }
}*/

export function debounce<T extends AnyFunction>(func: T, delay: number) {
  let timeoutId: ReturnType<typeof setTimeout> | number | null;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>) {
    const context = this;

    const later = function () {
      timeoutId = null;
      func.apply(context, args);
    };

    clearTimeout(timeoutId as number);
    timeoutId = setTimeout(later, delay);
  };
}

type AnyFunction = (...args: any[]) => any;
