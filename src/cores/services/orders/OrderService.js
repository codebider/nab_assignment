const pick = require('lodash/pick');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');

const REQUIRED_OPTIONS = ['logger', 'orderDao'];

/**
 * OrderService
 * This is Product service
 */
class OrderService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
  }

  /**
   * Create order
   *
   * @returns {Promise<Array>}
   */
  async create(payload) {
    const { products, ...order } = payload;
    // TODO: Validate product ids

    await this.orderDao.createOrder(order, products);
  }
}

module.exports = OrderService;
