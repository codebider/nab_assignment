const ProductService = require('./ProductService');

module.exports = ({ logger, productDao, activityService }) => new ProductService({ logger, productDao, activityService });
