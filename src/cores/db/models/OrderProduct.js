module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'OrderProduct',
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      quantity: DataTypes.INTEGER,
    },
    {},
  );
  OrderProduct.associate = models => {
    // associations can be defined here
    const { Order, Product } = models;
    OrderProduct.belongsTo(Order, {
      foreignKey: 'orderId',
      targetKey: 'id',
    });

    OrderProduct.belongsTo(Product, {
      foreignKey: 'productId',
      targetKey: 'id',
    });
  };
  return OrderProduct;
};
