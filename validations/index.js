const userValidations = require('./userValidations');
const reviewValidations = require('./reviewValidations');

module.exports = {
	...userValidations,
	...reviewValidations,
};
