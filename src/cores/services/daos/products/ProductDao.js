const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../../commons/helpers/purgeMissingProperties');
const { queryLike, queryRange, queryIn, buildOrder } = require('../utils');

class ProductDao extends BaseDao {
  /**
   * Get, search, filter products
   *
   * @param {Object} filter
   * @param {string} sortBy - sort
   * @param {number} page - number of page
   * @param {number} limit - number of item per page
   *
   * @returns {Promise<any>} - list of products
   */
  async findAllAndFilter(
    { search, colour, branch, priceFrom, priceTo },
    sortBy = 'createdAt',
    page = 1,
    limit = 10,
  ) {
    const offset = (page - 1) * limit;

    // Build query for name
    let queryName;
    if (search) {
      queryName = queryLike('name', search);
    }
    const order = buildOrder(sortBy);
    const queryPrice = queryRange('price', priceFrom, priceTo);
    const where = purgeMissingProperties({
      colour,
      branch,
      ...queryName,
      ...queryPrice,
    });
    const data = await this.Model.findAndCountAll({
      where,
      order,
      offset,
      limit,
      attributes: ['id', 'name', 'colour', 'branch', 'price'],
    });
    return toJSON(data);
  }

  /**
   * get list pricing by list product ids
   *
   * @param {Array<number>} ids
   * @returns {Promise<any>} - list pricing with id
   */
  async getPricing(ids) {
    const data = await this.Model.findAll({
      where: queryIn('id', ids),
      attributes: ['id', 'price'],
    });
    return toJSON(data);
  }
}

module.exports = ProductDao;
