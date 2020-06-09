const { stringItem, objectItem, numberItem, arrayItem } = require('../../../schemas');

const headerSchema = objectItem
  .keys({
    uuid: stringItem.example('8717febc-a9e7-11ea-bb37-0242ac130002'),
  })
  .unknown();

const productItem = objectItem.keys({
  productId: numberItem.example(1),
  quantity: numberItem.example(2),
});

const payloadSchema = objectItem.keys({
  customerPhone: stringItem.required().example('0961171948'),
  customerName: stringItem.required().example('Daniel'),
  shippingAddress: stringItem.required().example('235 Cong Hoa'),
  shippingCity: stringItem.required().example('Ho Chi Minh'),
  products: arrayItem.items(productItem),
});

const responseSchema = objectItem.keys({
  data: {},
});

module.exports = {
  headerSchema,
  payloadSchema,
  responseSchema,
};
