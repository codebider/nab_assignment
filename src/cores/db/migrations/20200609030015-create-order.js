module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      customerPhone: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerName: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shippingAddress: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shippingCity: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      shippingFee: {
        defaultValue: 0,
        type: Sequelize.DOUBLE,
      },
      totalPrice: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: queryInterface => {
    return queryInterface.dropTable('Orders');
  },
};
