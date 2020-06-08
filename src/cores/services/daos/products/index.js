const ProductDao = require('./ProductDao');

module.exports = ({ db }) =>
  new ProductDao({
    db,
    Model: db.sequelize.models.Product,
  });
