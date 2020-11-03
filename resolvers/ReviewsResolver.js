const getUserReviews = require('../src/review/queries/getUserReviews');
const getAdvertizeReviews = require('../src/review/queries/getAdvertizeReviews');
const postUserReview = require('../src/review/mutations/postUserReview');
const postAdvertizeReview = require('../src/review/mutations/postAdvertizeReview');

exports.default = {
	Query: {
		getAdvertizeReviews,
		getUserReviews,
	},
	Mutation: {
		postAdvertizeReview,
		postUserReview,
	},
};
