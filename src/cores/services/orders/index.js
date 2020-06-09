const OrderService = require('./OrderService');

module.exports = ({ logger, orderDao, productDao }) =>
  new OrderService({ logger, orderDao, productDao });
