const { stringItem, id, objectItem, numberItem, allowMissing } = require('../../../schemas');

const querySchema = objectItem.keys({
  branch: stringItem.example('apple').allow(...allowMissing),
  colour: stringItem.example('red').allow(...allowMissing),
  search: stringItem.allow(...allowMissing).example('laptop'),
  priceFrom: numberItem.example(100).allow(...allowMissing),
  priceTo: numberItem.example(2000).allow(...allowMissing),
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
