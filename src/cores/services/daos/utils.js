const { Sequelize } = require('sequelize');

const isMissing = require('../../../commons/conditional/isMissing');
const throwIfNotArray = require('../../../commons/assertion/throwIfNotArray');

const queryLike = (field, value) => {
  if (isMissing(value)) {
    return {};
  }
  return {
    [field]: {
      [Sequelize.Op.like]: `%${value}%`,
    },
  };
};

const queryIn = (field, value) => {
  throwIfNotArray(value, 'This value is not an array');

  return {
    [field]: {
      [Sequelize.Op.in]: value,
    },
  };
};

const queryRange = (field, from, to) => {
  if (isMissing(from) && isMissing(to)) {
    return {};
  }

  const query = { [field]: {} };
  if (!isMissing(from)) {
    query[field][Sequelize.Op.gte] = from;
  }
  if (!isMissing(to)) {
    query[field][Sequelize.Op.lte] = to;
  }

  return query;
};

module.exports = {
  queryIn,
  queryLike,
  queryRange,
};
