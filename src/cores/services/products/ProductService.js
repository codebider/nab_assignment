const pick = require('lodash/pick');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');
const isMissing = require('../../../commons/conditional/isMissing');
const NotFoundError = require('../../../commons/errors/NotFoundError');

const REQUIRED_OPTIONS = ['logger', 'productDao', 'activityService'];

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
    const { search, colour, branch, priceFrom, priceTo, page = 1, limit = 10 } = filters;

    const { rows: data, count: total } = await this.productDao.findAllAndFilter(
      { search, colour, branch, priceFrom, priceTo },
      page,
      limit,
    );

    if (search) {
      await this.activityService.createSearchingActivity(search);
    }

    if (colour || branch || priceFrom || priceTo) {
      await this.activityService.createFilteringActivity({
        colour,
        branch,
        priceFrom,
        priceTo,
      });
    }

    return {
      data,
      meta: {
        total,
        limit,
        page,
      },
    };
  }

  /**
   * Get product detail by id
   *
   * @param {number} id
   * @returns {Promise<Object>}
   */
  async getById(id) {
    const product = await this.productDao.findById(id);

    if (isMissing(product)) {
      throw new NotFoundError('Not found');
    }
    // Save to activity logs
    // TODO move this one to queue
    await this.activityService.createViewingActivity(id);
    return product;
  }
}

module.exports = ProductService;
