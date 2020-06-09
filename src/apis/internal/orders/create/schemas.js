const { stringItem, id, objectItem, numberItem, allowMissing } = require('../../../schemas');

const headerSchema = objectItem
  .keys({
    uuid: stringItem.example('8717febc-a9e7-11ea-bb37-0242ac130002'),
  })
  .unknown();

const payloadSchema = objectItem.keys({
  uuid: stringItem.example('8717febc-a9e7-11ea-bb37-0242ac130002').allow(...allowMissing),
  action: stringItem.example('filtering').allow(...allowMissing),
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
  headerSchema,
  payloadSchema,
  responseSchema,
};
