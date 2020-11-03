const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategoriesSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	description: String,
	parent: {
		type: Schema.Types.ObjectId,
		ref: 'Categories',
	},
	count: Number,
	createdDate: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model('Categories', CategoriesSchema);
