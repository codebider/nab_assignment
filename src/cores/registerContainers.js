const { createContainer, asValue, asFunction } = require('awilix');
const get = require('lodash/get');
const { v1: uuidV1 } = require('uuid');

const config = require('./config');
const logger = require('./utils/logger');
const db = require('./db/models');
const productDao = require('./services/daos/products');
const orderProductDao = require('./services/daos/order-products');
const orderDao = require('./services/daos/orders');
const activityDao = require('./services/daos/activities');
const productService = require('./services/products');
const activityService = require('./services/activities');
const orderService = require('./services/orders');
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
  orderProductDao: asFunction(orderProductDao).singleton(),
  orderDao: asFunction(orderDao).singleton(),

  // Services
  productService: asFunction(productService).scoped(),
  activityService: asFunction(activityService).scoped(),
  orderService: asFunction(orderService).scoped(),
});

const registerContainer = request => {
  const uuid = get(request, 'headers.uuid', uuidV1());
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
