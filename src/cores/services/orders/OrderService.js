const pick = require('lodash/pick');
const find = require('lodash/find');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');
const BadUserInputError = require('../../../commons/errors/BadUserInputError');
const bigNumber = require('../../utils/math-utils');

const REQUIRED_OPTIONS = ['logger', 'orderDao', 'productDao'];

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
   * @param {Object} payload
   * @returns {Promise<Array>}
   */
  async create(payload) {
    this.logger.debug('Create order with payload', payload);
    const { products, ...order } = payload;

    const productIds = products.map(({ productId }) => productId);
    const productPrices = await this.productDao.getPricing(productIds);

    // Validate product ids
    if (productPrices.length !== productIds.length) {
      throw new BadUserInputError('Product Id Not Found');
    }

    // Calculate total price
    const shippingFee = 100; // Hardcode for now, should be calculate base on address

    const totalPrice = bigNumber(shippingFee);
    products.forEach(item => {
      const { quantity, productId } = item;
      const { price } = find(productPrices, { id: productId });
      // enrich product
      Object.assign(item, { price });

      const productPrice = bigNumber(price)
        .times(quantity)
        .toNumber();

      totalPrice.plus(productPrice);
    });

    Object.assign(order, { totalPrice: totalPrice.toFixed(), shippingFee });

    const data = await this.orderDao.createOrder(order, products);

    return data;
  }
}

module.exports = OrderService;
