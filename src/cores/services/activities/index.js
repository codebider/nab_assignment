const ActivityService = require('./ActivityService');

module.exports = ({ logger, activityDao, uuid }) =>
  new ActivityService({ logger, activityDao, uuid });
