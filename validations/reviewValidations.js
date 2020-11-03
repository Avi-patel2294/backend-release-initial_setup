const { object, string, number } = require('yup');

const InvalidReview = 'Invalid Review';

const userReviewValidation = object().shape({
	review: string().required().min(3, InvalidReview).max(500, InvalidReview),
	rating: number().min(1, InvalidReview).max(5, InvalidReview),
	userReviewerId: string().required(),
});

const advertizeReviewValidation = object().shape({
	review: string().required().min(3, InvalidReview).max(500, InvalidReview),
	rating: number().min(1, InvalidReview).max(5, InvalidReview),
	advertizeId: string().required(),
});

module.exports = { userReviewValidation, advertizeReviewValidation };
