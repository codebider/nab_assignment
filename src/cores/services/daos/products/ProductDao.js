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
  async findAllAndFilter({ name, colour, branch, priceFrom, priceTo }, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Build query for time
    let queryName;
    if (name) {
      queryName = queryLike('name', name);
    }
    const queryPrice = queryRange('price', priceFrom, priceTo);
    const where = purgeMissingProperties({
      colour, branch, ...queryName, ...queryPrice
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
