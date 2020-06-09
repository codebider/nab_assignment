const responseMapper = require('../../../../commons/responseMapper');

const list = async request => {
  const { payload } = request;

  const orderService = request.getContainer('orderService');

  await orderService.create(payload);

  return responseMapper.mapData();
};

module.exports = {
  list,
};
