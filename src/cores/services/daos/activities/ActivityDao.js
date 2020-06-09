const BaseDao = require('../BaseDao');
const toJSON = require('../../../../commons/helpers/toJSON');
const purgeMissingProperties = require('../../../../commons/helpers/purgeMissingProperties');

class ActivityDao extends BaseDao {
  async findAllAndFilter({ action, uuid }, page = 1, limit = 10) {
    const offset = (page - 1) * limit;

    // Build query for name
    const where = purgeMissingProperties({
      action,
      uuid,
    });
    const data = await this.Model.findAndCountAll({
      where,
      offset,
      limit,
    });

    return toJSON(data);
  }
}

module.exports = ActivityDao;
