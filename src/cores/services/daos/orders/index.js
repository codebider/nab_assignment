const OrderDao = require('./OrderDao');

module.exports = ({ db, orderProductDao }) =>
  new OrderDao({
    db,
    Model: db.sequelize.models.Order,
    orderProductDao,
  });
