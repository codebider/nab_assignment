const { createContainer, asValue } = require('awilix');
const config = require('./config');
const logger = require('./utils/logger');
// Main container for whole application.
const container = createContainer();

// Application scope
container.register({
  config: asValue(config),
  logger: asValue(logger),

  // DB

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
};

const stop = async () => {
  logger.log('Try to close some services');
};

module.exports = {
  registerContainer,
  init,
  stop,
};
