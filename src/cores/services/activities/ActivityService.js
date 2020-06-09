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
}

module.exports = ActivityService;
