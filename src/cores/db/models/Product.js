module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'Product',
    {
      name: DataTypes.STRING,
      branch: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      deletedAt: DataTypes.DATE,
    },
    {},
  );

  Product.associate = function() {
    // associations can be defined here
  };
  return Product;
};
