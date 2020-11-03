const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = require('../config');

module.exports = async (req, res, next) => {
	const authHeader = req.get('Authorization');
	if (!authHeader) {
		req.isAuth = false;
		return next();
	}

	const token = authHeader.split(' ')[1];
	if (!token || token === '') {
		req.isAuth = false;
		return next();
	}
	let decodeToken;
	try {
		decodeToken = await jwt.verify(token, ACCESS_TOKEN_SECRET);
	} catch (err) {
		req.isAuth = false;
		return next();
	}

	if (!decodeToken) {
		req.isAuth = false;
		return next();
	}
	req.isAuth = true;
	req.userId = decodeToken.id;
	next();
};
