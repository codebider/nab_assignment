const BaseDao = require('../BaseDao');

class OrderDao extends BaseDao {
  async createOrder(payload, products) {
    const transaction = await this.transaction();
    try {
      const order = await this.create(payload, transaction);

      const { id } = order;

      const promises = products.map(item => {
        Object.assign(item, { orderId: id });

        return this.orderProductDao.create(item, transaction);
      });

      await Promise.all(promises);
      // If the execution reaches this line, no errors were thrown.
      // We commit the transaction.
      await transaction.commit();

      return order;
    } catch (error) {
      // If the execution reaches this line, an error was thrown.
      // We rollback the transaction.
      await transaction.rollback();
      throw error;
    }
  }
}

module.exports = OrderDao;
