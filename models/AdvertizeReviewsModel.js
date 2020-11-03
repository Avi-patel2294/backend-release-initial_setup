const mongoose = require('mongoose');

const { Schema } = mongoose;

const AdvertizeReviewsSchema = new Schema({
	review: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
	},
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	advertizeId: {
		type: Schema.Types.ObjectId,
		ref: 'Advertize',
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('AdvertizeReview', AdvertizeReviewsSchema);
