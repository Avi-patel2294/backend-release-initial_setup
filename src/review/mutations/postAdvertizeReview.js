// const { advertizeReviewValidation } = require('@advertize/common');
const AdvertizeReview = require('../../../models/AdvertizeReviewsModel');
const logger = require('../../../logger');

const postAdvertizeReviews = async (_root, { input }, { req }) => {
	// try {
	// 	await advertizeReviewValidation.validate(input);
	// } catch (err) {
	// 	logger.error(
	// 		`src:review:mutations:postAdvertizeReviews:: Error Validating Advertize Reviews Data`,
	// 		err
	// 	);
	// 	throw new Error(err);
	// }

	if (!req.isAuth) {
		logger.error(
			`src:review:mutations:postAdvertizeReviews:: User is Unauthorized`
		);
		throw new Error('Advertize is Unauthorized to post review');
	}

	try {
		const { review, rating, advertizeId } = input;
		const { userId } = req;
		const newReview = await new AdvertizeReview({
			review,
			rating,
			advertizeId,
			userId,
		}).save();

		return newReview;
	} catch (err) {
		logger.error(
			`src:review:mutations:postAdvertizeReviews:: Error Saving reviews to database `,
			err
		);
		throw new Error(err);
	}
};
module.exports = postAdvertizeReviews;
