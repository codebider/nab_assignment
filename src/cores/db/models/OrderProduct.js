module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define(
    'OrderProduct',
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      price: DataTypes.DOUBLE,
    },
    {},
  );
  OrderProduct.associate = models => {
    // associations can be defined here
    const { Order } = models;
    OrderProduct.belongsTo(Order, {
      foreignKey: 'orderId',
      targetKey: 'id',
    });
  };
  return OrderProduct;
};
