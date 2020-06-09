const responseMapper = require('../../../../commons/responseMapper');

const list = async request => {
  const { query } = request;

  const productService = request.getContainer('productService');

  const { data, meta } = await productService.list(query);

  return responseMapper.mapData(data, meta);
};

module.exports = {
  list,
};
