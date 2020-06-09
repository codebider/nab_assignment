const Cache = require('./Cache');

/**
 * Support for preparing list of cache objects.
 */
class CacheLoader {
  /**
   * Creates the cache object according the given config items.
   * Each cache item will have at least key and ttl value.
   * The key: this is the unique value.
   * The ttl: The maximum time of a record of this key.
   *
   * @param {Object} items - config cache item.
   */
  static createCache(items) {
    const caches = {};
    if (Array.isArray(items)) {
      items.forEach(config => {
        const { key, ttl } = config;
        const cache = new Cache(ttl);
        caches[key] = cache;
      });
    }

    return caches;
  }

  /**
   * Loads list of cache configuration from config.
   *
   * @param {Array} items - List of cache configurations.
   *
   * @returns {Array} - List of cache object.s
   */
  loadCache(items) {
    const caches = CacheLoader.createCache(items);
    Object.assign(this, caches);

    return caches;
  }
}

module.exports = new CacheLoader();
