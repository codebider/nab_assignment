const responseMapper = require('../../../../commons/responseMapper');

const list = async request => {
  const { payload } = request;

  const orderService = request.getContainer('orderService');

  const response = await orderService.create(payload);

  return responseMapper.mapData(response);
};

module.exports = {
  list,
};
