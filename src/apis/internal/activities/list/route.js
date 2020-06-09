const InvalidOperationError = require('../../../../commons/errors/InvalidOperationError');
const createErrorResponses = require('../../../../commons/errors/createErrorResponses');

const handler = require('./handler');
const schemas = require('./schemas');

const route = {
  method: 'GET',
  path: '/internal/activities',
  handler: handler.list,
  options: {
    tags: ['api', 'internal', 'activities', 'list'],
    description: 'List activities',
    notes: 'List activities',
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
