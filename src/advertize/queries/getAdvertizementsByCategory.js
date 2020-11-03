const Advertize = require('../../../models/AdvertizeModel');
const logger = require('../../../logger');

const getAdvertizementsByCategory = async (_root, { categoryId }) => {
	logger.info(
		`src:advertize:queries:getAdvertizementsByCategory::categoryId${categoryId}`
	);
	const getAllAdvertize = await Advertize.find({
		category: categoryId,
	})
		.sort({
			createdDate: 'desc',
		})
		.populate('category');
	return getAllAdvertize;
};

module.exports = getAdvertizementsByCategory;
