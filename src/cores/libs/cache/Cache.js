const { init, set, get } = require('node-cache-redis');

/**
 * This class will have to cache data base on the key and TTL time.
 */
class Cache {
  constructor(stdTTL) {
    const cacheConfig = {
      ttlInSeconds: stdTTL,
    };

    this.cache = {
      init,
      set,
      get,
    };
    this.cache.init(cacheConfig);
  }

  /**
   * Gets the data from cache. The first action, it will try to look-up inside
   * the cache. It check whether the input key existed or doesn't exist in cache.
   *
   * In case, it existed in cache, it will check the TTL of that cache record.
   * If it is expired. It will make a call to storeFunction for getting the latest data.
   *
   * In case, it doesn't exist in cache, it will call storeFunction.
   *
   * @param {*} key - The cache key, it must be unique.
   * @param {*} storeFunction  - The func which will be called when the key not exited in cache.
   * This function must return a promise.
   * @returns {Object}
   */
  async get(key, storeFunction) {
    // Try to load data from cache first.
    const value = await this.cache.get(key);

    if (value) {
      return Promise.resolve(value);
    }

    return storeFunction().then(async result => {
      await this.cache.set(key, result);
      return result;
    });
  }
}

module.exports = Cache;
