const { createContainer, asValue, asFunction } = require('awilix');
const config = require('./config');
const logger = require('./utils/logger');
const db = require('./db/models');
const productDao = require('./services/daos/products');
// Main container for whole application.
const container = createContainer();

// Application scope
container.register({
  config: asValue(config),
  logger: asValue(logger),

  // DB
  db: asValue(db),
  productDao: asFunction(productDao).singleton(),

  // Services
});

const registerContainer = () => {
  const requestScope = container.createScope();
  // services
  requestScope.register({
    // register for scope
  });

  return requestScope;
};

const init = async () => {
  logger.log('Try to init some services');
  await db.sequelize.authenticate();
};

const stop = async () => {
  logger.log('Try to close some services');
};

module.exports = {
  registerContainer,
  init,
  stop,
};
