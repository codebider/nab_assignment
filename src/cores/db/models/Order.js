module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'Order',
    {
      customerPhone: DataTypes.STRING,
      customerName: DataTypes.STRING,
      shippingAddress: DataTypes.STRING,
      shippingCity: DataTypes.STRING,
      shippingFee: DataTypes.DOUBLE,
      totalPrice: DataTypes.DOUBLE,
    },
    {},
  );

  Order.associate = function() {
    // associations can be defined here
  };
  return Order;
};
