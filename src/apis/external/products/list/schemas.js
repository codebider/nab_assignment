const { stringItem, id, objectItem, numberItem, allowMissing } = require('../../../schemas');

const querySchema = objectItem.keys({
  name: stringItem.allow(...allowMissing).example('123'),
  limit: numberItem.example(10).allow(...allowMissing),
  page: numberItem.example(1).allow(...allowMissing),
});

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  querySchema,
  responseSchema,
};
