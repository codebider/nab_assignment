const responseMapper = require('../../../../commons/responseMapper');

const handle = async request => {
  const {
    params: { id: productId },
  } = request;

  const productService = request.getContainer('productService');

  const data = await productService.getById(productId);

  return responseMapper.mapData(data);
};

module.exports = handle;
