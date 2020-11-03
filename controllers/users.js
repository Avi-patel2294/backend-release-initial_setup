const JWT = require('jsonwebtoken');
const user = require('../models/UserModel');
require('dotenv').config({ path: '../variables.env' });

const signToken = require('../service/signToken');
// signToken = user => {
//   return JWT.sign(
//     {
//       iss: 'AdvertizePro',
//       sub: user.id,
//       iat: new Date().getTime(), // current time
//       exp: new Date().setDate(new Date().getDate() + 1) // current time + 1 day ahead
//     },
//     process.env.SECRET
//   );
// };
module.exports = {
	signIn: async (req, res, next) => {
		// Generate token
		// console.log(req.user);
		const token = signToken(req.user);
		res.cookie('access_token', token, {
			httpOnly: true,
		});
		res.status(200).json({ success: true });
	},
};
