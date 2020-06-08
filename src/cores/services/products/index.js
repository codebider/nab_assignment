const ProductService = require('./ProductService');

module.exports = ({ logger, productDao }) => new ProductService({ logger, productDao });
