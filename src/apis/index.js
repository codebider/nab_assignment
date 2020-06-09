const externalProducts = require('./external/products');
const internalActivities = require('./internal/activities');

module.exports = [...externalProducts, ...internalActivities];
