const OrderService = require('./OrderService');

module.exports = ({ logger, orderDao }) => new OrderService({ logger, orderDao });
