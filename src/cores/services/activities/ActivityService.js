const pick = require('lodash/pick');

const throwIfMissing = require('../../../commons/assertion/throwIfMissing');
const { ACTIONS } = require('./constants');

const REQUIRED_OPTIONS = ['logger', 'activityDao', 'uuid'];

/**
 * ActivityService
 * This is Product service
 */
class ActivityService {
  constructor(opts, requiredOptions = REQUIRED_OPTIONS) {
    requiredOptions.forEach(key => {
      throwIfMissing(opts[key], `options.${key} is required`);
    });

    Object.assign(this, pick(opts, requiredOptions));

    this.logger.debug('Init ActivityService');
  }

  async createSearchingActivity(search) {
    await this.activityDao.create({
      uuid: this.uuid,
      action: ACTIONS.SEARCHING,
      payload: { search },
    });
  }

  async createViewingActivity(productId) {
    await this.activityDao.create({
      uuid: this.uuid,
      action: ACTIONS.VIEWING,
      payload: { productId },
    });
  }

  async createFilteringActivity(payload) {
    await this.activityDao.create({
      uuid: this.uuid,
      action: ACTIONS.FILTERING,
      payload,
    });
  }

  async list(query) {
    const { action, uuid, page = 1, limit = 10 } = query;

    const { rows: data, count: total } = await this.activityDao.findAllAndFilter(
      { action, uuid },
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

module.exports = ActivityService;
