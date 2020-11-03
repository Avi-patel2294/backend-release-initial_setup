const Advertize = require('../../../models/AdvertizeModel');
const logger = require('../../../logger');

const getSingleAdvertize = async (root, { _id }) => {
	const advertize = await Advertize.findById(_id).populate('user');
	// .populate('category');
	return advertize;
};

module.exports = getSingleAdvertize;
