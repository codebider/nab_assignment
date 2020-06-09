const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../../commons/helpers/purgeMissingProperties');
const { queryLike, queryRange, queryIn } = require('../utils');

class ProductDao extends BaseDao {
  /**
   * Get, search, filter products
   *
   * @param {string} search - search by name
   * @param {string} colour - filter by colour
   * @param {string} branch - filter by branch
   * @param {number} priceFrom - filter price
   * @param {number} priceTo - filter price
   * @param {number} page - number of page
   * @param {number} limit - number of item per page
   *
   * @returns {Promise<any>} - list of products
   */
  async findAllAndFilter({ search, colour, branch, priceFrom, priceTo }, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Build query for name
    let queryName;
    if (search) {
      queryName = queryLike('name', search);
    }
    const queryPrice = queryRange('price', priceFrom, priceTo);
    const where = purgeMissingProperties({
      colour,
      branch,
      ...queryName,
      ...queryPrice,
    });
    const data = await this.Model.findAndCountAll({
      where,
      offset,
      limit,
      attributes: ['id', 'name', 'colour', 'branch', 'price'],
    });
    return toJSON(data);
  }

  async getPricing(ids) {
    const data = await this.Model.findAll({
      where: queryIn('id', ids),
      attributes: ['id', 'price'],
    });
    return toJSON(data);
  }
}

module.exports = ProductDao;
