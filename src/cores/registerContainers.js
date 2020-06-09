const { createContainer, asValue, asFunction } = require('awilix');
const get = require('lodash/get');
const config = require('./config');
const logger = require('./utils/logger');
const db = require('./db/models');
const productDao = require('./services/daos/products');
const activityDao = require('./services/daos/activities');
const productService = require('./services/products');
const activityService = require('./services/activities');
// Main container for whole application.
const container = createContainer();

// Application scope
container.register({
  config: asValue(config),
  logger: asValue(logger),

  // DB
  db: asValue(db),
  productDao: asFunction(productDao).singleton(),
  activityDao: asFunction(activityDao).singleton(),

  // Services
  productService: asFunction(productService).scoped(),
  activityService: asFunction(activityService).scoped(),
});

const registerContainer = request => {
  const uuid = get(request, 'headers.uuid');
  const requestScope = container.createScope();
  // services
  requestScope.register({
    // register for scope
    uuid: asValue(uuid),
  });

  return requestScope;
};

const init = async () => {
  logger.log('Try to init some services');
  await db.sequelize.authenticate();
};

const stop = async () => {
  logger.log('Try to close some services');
  await db.sequelize.close();
};

module.exports = {
  registerContainer,
  init,
  stop,
};
