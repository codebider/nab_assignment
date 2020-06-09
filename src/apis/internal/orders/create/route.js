const InvalidOperationError = require('../../../../commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../../commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/internal/orders',
  handler: handler.list,
  options: {
    tags: ['api', 'internal', 'orders', 'create'],
    description: 'create orders',
    notes: 'create orders',
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
