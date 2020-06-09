module.exports = {
  up: async queryInterface => {
    const users = ['laptop', 'iphone', 'omo', 'Macbook'];
    const colours = ['red', 'white', 'yellow', 'blue'];
    const branch = ['Sony', 'Apple', 'obama', 'apple'];
    const prices = [1000, 3400, 4000, 54200];

    const payload = users.map((item, index) => ({
      name: item,
      colour: colours[index],
      branch: branch[index],
      price: prices[index],
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    return queryInterface.bulkInsert('Products', payload, {});
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('Products', null, {});
  },
};
