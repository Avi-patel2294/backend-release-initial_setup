const Advertize = require('../../../models/AdvertizeModel');
const logger = require('../../../logger');

const getCurrentUserAdvertizements = async (root, args, { req, res }) => {
	logger.info(
		`src:advertize:queries:getCurrentUserAdvertizements::userid::${req.session.userId}`
	);
	if (!req.session.userId) {
		logger.error(
			`src:advertize:queries:getCurrentUserAdvertizements::userID not found`
		);
		return null;
	}
	const getAllAdvertize = await Advertize.find({
		user: req.session.userId,
	}).sort({
		createdDate: 'desc',
	});
	return getAllAdvertize;
};

module.exports = getCurrentUserAdvertizements;
