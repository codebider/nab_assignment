const hashPwd = require('../../commons/utils/hashPwd');

module.exports = {
  up: async queryInterface => {
    const users = ['laptop', 'iphone', 'omo', 'Macbook'];

    const payload = users.map(item => ({
      name: item,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Products', payload, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
