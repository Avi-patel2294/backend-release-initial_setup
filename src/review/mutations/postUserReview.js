const { userReviewValidation } = require('../../../validations');
const UserReview = require('../../../models/UserReviewsModel');
const logger = require('../../../logger');

const postUserReviews = async (_root, { input }, { req }) => {
	try {
		await userReviewValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:review:mutations:postUserReviews:: Error Validating userReviews Data`,
			err
		);
		throw new Error(err);
	}

	if (!req.isAuth) {
		logger.error(`src:review:mutations:postUserReviews:: User is Unauthorized`);
		throw new Error('User is Unauthorized to post review');
	}

	try {
		const { review, rating, userReviewedId } = input;
		const reviewerId = req.userId;
		const newReview = await new UserReview({
			review,
			rating,
			userReviewedId,
			reviewerId,
		}).save();

		return newReview;
	} catch (err) {
		logger.error(
			`src:review:mutations:postUserReviews:: Error Saving reviews to database `,
			err
		);
		throw new Error(err);
	}
};
module.exports = postUserReviews;
