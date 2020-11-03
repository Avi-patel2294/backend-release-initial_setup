const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserReviewsSchema = new Schema({
	review: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	userReviewedId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	reviewerId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('UserReview', UserReviewsSchema);
