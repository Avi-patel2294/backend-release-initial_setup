const AdvertizeReview = require('../../../models/AdvertizeReviewsModel');
const logger = require('../../../logger');

const getAdvertizeReviews = async (_root, { advertizeId }) => {
	if (!advertizeId) {
		logger.error(
			`src:review:queries:getAdvertizeReviews::Advertize Id Not found: ${advertizeId}`
		);
		throw new Error('AdvertizeID not found');
	}
	try {
		const advertizeReviews = await AdvertizeReview.find({
			advertizeId: advertizeId,
		}).populate('user');

		return advertizeReviews;
	} catch (err) {
		logger.error(
			`src:review:queries:getAdvertizeReviews:: Error querying Database `,
			err
		);
		throw new Error(err);
	}
};

module.exports = getAdvertizeReviews;
