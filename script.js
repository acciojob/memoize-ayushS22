function memoize(callback, resolver) {
  const cache = new Map();

  const getKey = (args) => {
    if (typeof resolver === "function") {
      return resolver(...args); // 🔥 MUST spread
    }
    return JSON.stringify(args); // default
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

  memoized.clear = function () {
    cache.clear();
  };

  memoized.delete = function (...args) {
    const key = getKey(args);
    return cache.delete(key);
  };

  memoized.has = function (...args) {
    const key = getKey(args);
    return cache.has(key);
  };

  return memoized;
}

module.exports = memoize;