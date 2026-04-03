function memoize(callback, resolver) {
  const cache = new Map();

  // function to generate key
  const getKey = (args) => {
    if (resolver) {
      return resolver(...args); // custom resolver
    }
    return JSON.stringify(args); // default behavior
  };

  const memoized = function (...args) {
    const key = getKey(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = callback(...args);
    cache.set(key, result);
    return result;
  };

  // clear cache
  memoized.clear = function () {
    cache.clear();
  };

  // delete specific cache entry
  memoized.delete = function (...args) {
    const key = getKey(args);
    cache.delete(key);
  };

  // check if cache has entry
  memoized.has = function (...args) {
    const key = getKey(args);
    return cache.has(key);
  };

  return memoized;
}

module.exports = memoize;