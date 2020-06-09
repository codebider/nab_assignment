const InvalidOperationError = require('../../../../commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../../commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'POST',
  path: '/internal/orders',
  handler: handler.list,
  options: {
    tags: ['api', 'internal', 'orders', 'create'],
    description: 'Create an order',
    notes: 'Create an order',
    validate: {
      headers: schemas.headerSchema,
      payload: schemas.payloadSchema,
    },
    plugins: {
      'hapi-swagger': {
        responses: {
          200: { description: 'OK', schema: schemas.responseSchema },
          ...createErrorResponses(new InvalidOperationError()),
        },
      },
    },
  },
};

module.exports = route;
