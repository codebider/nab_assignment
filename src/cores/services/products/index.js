const ProductService = require('./ProductService');

module.exports = ({ logger, productDao, activityService, cache }) =>
  new ProductService({ logger, productDao, activityService, cache });
