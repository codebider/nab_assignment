const responseMapper = require('../../../../commons/responseMapper');

const list = async request => {
  const productService = request.getContainer('productService');

  const data = await productService.list();

  return responseMapper.mapData(data);
};

module.exports = {
  list,
};
