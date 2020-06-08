const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../../commons/helpers/purgeMissingProperties');
const { queryLike, queryRange } = require('../utils');

class ProductDao extends BaseDao {
  /**
   * Find all products
   *
   * @returns {Promise<Array<Object>>} - list products
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
}

module.exports = ProductDao;
