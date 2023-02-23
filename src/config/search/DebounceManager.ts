type fnType = (...args: any[]) => void;

type DebounceInstance = fnType & {
  cancel: () => void;
};

// minimal debounce function, mostly for not spamming the server with requests when searching with type ahead
function debounce(fn: fnType, wait: number): DebounceInstance {
  let timeout;

  const debouncedFn = function () {
    const args = arguments;
    const later = () => {
      fn.apply(null, args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debouncedFn.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debouncedFn;
}

class DebounceManager {
  debounceCache: Record<string, DebounceInstance> = {};

  // Dynamically debounce and cache a debounced version of a func at the time of calling that func. This avoids managing debounced version of funcs locally.
  // In other words, debounce usually works by debouncing based on referential identity of a func. This works by comparing provided func names.
  // This also has the ability to short-circuit a debounce all-together, if no wait time is provided.
  // Assumption: Funcs are debounced on a combo of unique func name and wait times.
  // So debouncing won't work on subsequent calls with different wait times or different funcs.
  // That also means that the debounce manager can be used for different funcs in parallel, and keep the two funcs debounced separately.
  runWithDebounce(
    wait:      number,  // Milliseconds to debounce. Executes immediately if falsey.
    name:      string,  // Name of function to debounce, used to create a unique key
    fn:        fnType,  // Func to debounce
    ...params: any[]    // Params to pass to func
  ) {
    if (!wait) return fn(...params);

    const key =     `${name}|${wait.toString()}`;
    let debounced = this.debounceCache[key];
    
    if (!debounced) {
      this.debounceCache[key] = debounce(fn, wait);
      debounced = this.debounceCache[key];
    }

    debounced(...params);
  }

  // Cancels existing debounced func calls. Will cancel any debounced func call, regardless of debounce length provided.
  // For example, making the following series of calls will create multiple debounced funcs, because they are cached by a combination of unique name and debounce length.
  //   runWithDebounce(1000, "_updateSearchResults", this._updateSearchResults);
  //   runWithDebounce(500,  "_updateSearchResults", this._updateSearchResults);
  //   runWithDebounce(1000, "_updateSearchResults", this._updateSearchResults);
  // Calling the following will cancel all of those, if they have not yet executed:
  //   cancelByName("_updateSearchResults")
  cancelByName(name: string) {  // name must match exactly what was provided when runWithDebounce was originally called.
    Object.entries(this.debounceCache)
      .filter(([ cachedKey ]) => cachedKey.startsWith(`${name}|`))
      .forEach(([ _, cachedValue ]) => cachedValue.cancel());
  }

  static debounce = (
    wait: number,  // Milliseconds to debounce. Executes immediately if falsey.
    fn: fnType     // Func to debounce
  ): DebounceInstance => debounce(fn, wait);  // Perform a standard debounce
}

export default DebounceManager;
