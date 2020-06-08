const pick = require('lodash/pick');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');

const REQUIRED_OPTIONS = ['logger', 'productDao'];

/**
 * ProductService
 * This is Product service
 */
class ProductService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));
  }

  /**
   * List products
   *
   * @returns {Promise<Array>}
   */
  async list() {
    const products = await this.productDao.findAll();

    return products;
  }
}

module.exports = ProductService;
