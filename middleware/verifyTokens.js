const jwt = require('jsonwebtoken');
const logger = require('../logger');
const { ACCESS_TOKEN_SECRET } = require('../config');
const verifyTokens = async (req, res, next) => {
	const auth = req.headers['authorization'];
	if (auth !== 'null' || auth !== '' || typeof auth !== 'undefined') {
		try {
			const payload = await jwt.verify(auth, ACCESS_TOKEN_SECRET);
			if (payload) {
				req.userId = payload.id;
			}
		} catch (err) {
			logger.error('middleware:verifyToken::Error Verifying accessToken', err);
			//res.sendStatus("403");
		}
	}
	next();
};

module.exports = verifyTokens;
