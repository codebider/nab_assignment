const { stringItem, id, objectItem, numberItem } = require('../../../schemas');

const headerSchema = objectItem
  .keys({
    uuid: stringItem.example('8717febc-a9e7-11ea-bb37-0242ac130002'),
  })
  .unknown();

const paramsSchema = objectItem.keys({
  id: numberItem.example(2),
});

const responseSchema = objectItem.keys({
  data: {
    id,
    fullName: stringItem,
    token: stringItem,
  },
});

module.exports = {
  paramsSchema,
  headerSchema,
  responseSchema,
};
