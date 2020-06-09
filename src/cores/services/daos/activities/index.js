const ActivityDao = require('./ActivityDao');

module.exports = ({ db }) =>
  new ActivityDao({
    db,
    Model: db.sequelize.models.Activity,
  });
