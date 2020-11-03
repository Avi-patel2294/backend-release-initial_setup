const UserReview = require('../../../models/UserReviewsModel');
const logger = require('../../../logger');

const getUserReviews = async (_root, { userId }) => {
	if (!userId) {
		logger.error(
			`src:review:queries:getUserReviews::User Id Not found: ${userId}`
		);
		throw new Error('UserID not found');
	}
	try {
		const userReviews = await UserReview.find({
			userReviewedId: userId,
		}).populate('user');

		return userReviews;
	} catch (err) {
		logger.error(
			`src:review:queries:getUserReviews:: Error querying Database `,
			err
		);
		throw new Error(err);
	}
};

module.exports = getUserReviews;
