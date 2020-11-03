const User = require('../../../models/UserModel');
const logger = require('../../../logger');

const getLoggedInUser = async (_root, _args, { req }) => {
	if (!req.session.userId) {
		logger.info(
			'server:resolvers:getLoggedInUser: session Id not found in the request'
		);
		return null;
	}
	logger.info(
		`server:resolvers:getLoggedInUser: UserId within the session request ${req.session.userId}`
	);
	const user = await User.findById(req.session.userId);
	return user;
};

module.exports = getLoggedInUser;
