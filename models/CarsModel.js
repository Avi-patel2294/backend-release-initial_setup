const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//Create Schema
const CarsSchema = new Schema({
	make: {
		type: String,
		required: true,
	},
	models: [
		{
			type: String,
		},
	],
});

module.exports = mongoose.model('car', CarsSchema);
