const responseMapper = require('../../../../commons/responseMapper');

const list = async request => {
  const { query } = request;

  const activityService = request.getContainer('activityService');

  const { data, meta } = await activityService.list(query);

  return responseMapper.mapData(data, meta);
};

module.exports = {
  list,
};
