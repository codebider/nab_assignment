const InvalidOperationError = require('../../../../commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../../commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/external/products',
  handler: handler.list,
  options: {
    tags: ['api', 'external', 'products', 'list'],
    description: 'List products',
    notes: 'List products',
    validate: {
      headers: schemas.headerSchema,
      query: schemas.querySchema,
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
