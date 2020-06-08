const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');

class ProductDao extends BaseDao {
  /**
   * Find all products
   *
   * @returns {Promise<Array<Object>>} - list products
   */
  async findAllRestaurants() {
    const collections = await this.Model.findAll();

    return toJSON(collections);
  }
}

module.exports = ProductDao;
