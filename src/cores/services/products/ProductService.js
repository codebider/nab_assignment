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
  async list(filters = {}) {
    const { name, colour, branch, priceFrom, priceTo, page = 1, limit = 10 } = filters;

    const { rows: data, count: total } = await this.productDao.findAllAndFilter(
        { name, colour, branch, priceFrom, priceTo },
        page,
        limit,
    );
    return {
      data,
      meta: {
        total,
        limit,
        page,
      },
    };
  }
}

module.exports = ProductService;
