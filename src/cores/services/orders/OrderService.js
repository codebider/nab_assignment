const pick = require('lodash/pick');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');
const bigNumber = require('../../utils/math-utils');

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

    // Calculate total price
    const { shippingFee } = order;
    const totalPrice = bigNumber(shippingFee);

    products.forEach(({ price, quantity }) => {
      const productPrice = bigNumber(price)
        .times(quantity)
        .toNumber();

      totalPrice.plus(productPrice);
    });

    Object.assign(order, { totalPrice: totalPrice.toFixed() });

    await this.orderDao.createOrder(order, products);
  }
}

module.exports = OrderService;
