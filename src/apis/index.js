const externalProducts = require('./external/products');
const internalActivities = require('./internal/activities');
const internalOrders = require('./internal/orders');

module.exports = [...externalProducts, ...internalActivities, ...internalOrders];
