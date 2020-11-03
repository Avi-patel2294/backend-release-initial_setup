const postAdvertize = require('../src/advertize/mutations/postAdvertize');
const getAllAdvertizements = require('../src/advertize/queries/getAllAdvertizements');
const getAdvertizementsByCategory = require('../src/advertize/queries/getAdvertizementsByCategory');
const getCurrentUserAdvertizements = require('../src/advertize/queries/getCurrentUserAdvertizements');
const getSingleAdvertize = require('../src/advertize/queries/getSingleAdvertize');
const searchAdvertizements = require('../src/advertize/queries/searchAdvertizements');
const advertizements = require('../src/advertize/queries/advertizements');

exports.default = {
	Query: {
		getAllAdvertizements: getAllAdvertizements,
		getCurrentUserAdvertizements: getCurrentUserAdvertizements,
		getAdvertizementsByCategory: getAdvertizementsByCategory,
		searchAdvertizements: searchAdvertizements,
		getSingleAdvertize: getSingleAdvertize,
		advertizements: advertizements,
	},
	Mutation: {
		postAdvertize: postAdvertize,
	},
};
