const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../../commons/helpers/purgeMissingProperties');

class ProductDao extends BaseDao {
  /**
   * Find all products
   *
   * @returns {Promise<Array<Object>>} - list products
   */
  async findAllAndFilter({ name }, page = 1, limit = 10) {
    const { Op } = this.Sequelize;
    const offset = (page - 1) * limit;

    // Build query for time
    let queryName;
    if (name) {
      queryName = {
        [Op.like]: `%${name}%`,
      };
    }
    const where = purgeMissingProperties({ name: queryName });
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
