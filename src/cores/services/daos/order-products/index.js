const OrderProduct = require('./OrderProduct');

module.exports = ({ db }) =>
  new OrderProduct({
    db,
    Model: db.sequelize.models.OrderProduct,
  });
