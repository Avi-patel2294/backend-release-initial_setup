const JWT = require('jsonwebtoken');
// const User = require('../models/UserModel');
require('dotenv').config({ path: '../variables.env' });
module.exports = signToken = (userId) => {
	return JWT.sign(
		{
			iss: 'AdvertizePro',
			sub: userId,
			// userId: user._id,
			iat: new Date().getTime(), // current time
			exp: new Date().setDate(new Date().getDate() + 7), // current time + 1 day ahead
		},
		process.env.SECRET
	);
};
