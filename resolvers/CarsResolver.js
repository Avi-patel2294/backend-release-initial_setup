const Cars = require('../models/CarsModel');
const logger = require('../logger');
exports.default = {
	Query: {
		getCars: async (root, args) => {
			const carsData = await Cars.find().sort({ name: 'asc' });
			return carsData;
		},
	},
};
