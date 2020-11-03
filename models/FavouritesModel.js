const mongoose = require('mongoose');

const { Schema } = mongoose;

const FavouritesSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	advertizeId: {
		type: String,
		required: true,
	},
});

FavouritesSchema.index({ userId: 1, advertizeId: 1 }, { unique: true });

module.exports = mongoose.model('favourite', FavouritesSchema);
