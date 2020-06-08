const InvalidOperationError = require('../../../../commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../../commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/external/products/{id}',
  handler,
  options: {
    tags: ['api', 'external', 'products', 'get'],
    description: 'Get one product',
    notes: 'Get one product',
    validate: {
      headers: schemas.headerSchema,
      params: schemas.paramsSchema,
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
