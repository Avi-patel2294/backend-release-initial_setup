const mongoose = require('mongoose');
const logger = require('../logger');

const { DB_CONNECTION_RETRIES, MONGO_URI } = require('../config');
const DBConnection = async () => {
	let retries = DB_CONNECTION_RETRIES;
	let db = mongoose.connection;

	db.on('error', function (error) {
		logger.error('Error in MongoDb connection: ', error);
		retries -= 1;
		logger.error(`retries left: ${retries}`);
	});

	db.on('connected', function () {
		logger.info('Database Connected successfuly');
		retries = -1;
	});

	while (retries > 0) {
		try {
			await mongoose.connect(MONGO_URI, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			});
		} catch (err) {
			logger.error('Database connection error: ', err);
			retries -= 1;
			logger.error(`retries left: ${retries}`);
			// wait 5 seconds
			await new Promise((res) => setTimeout(res, 5000));
		}
	}
};

module.exports = DBConnection;
