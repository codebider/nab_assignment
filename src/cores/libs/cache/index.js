const CacheLoader = require('./CacheLoader');

module.exports = ({ config }) => {
  CacheLoader.loadCache(config.get('cache'));
  return CacheLoader;
};
