const { verify } = require('jsonwebtoken');
const User = require('../../models/UserModel');
const logger = require('../../logger');
const { REFRESH_TOKEN_SECRET } = require('../../config');

const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require('../../service/Tokens');

const refreshToken = async (req, res) => {
	const token = req.cookies.artid;
	logger.info(`src:api:refreshhToken::token::${token}`);
	if (!token) {
		logger.error(`src:api:refreshToken::Trying to refreshToken without token`);
		return res.send({ ok: false, accessToken: '' });
	}

	let payload = null;
	try {
		payload = verify(token, REFRESH_TOKEN_SECRET);
	} catch (err) {
		logger.error(`src:api:refreshToken::Error verifying token`, err);
		return res.send({ ok: false, accessToken: '' });
	}

	const user = await User.findById(payload.id);

	if (!user) {
		logger.error(`src:api:refreshToken::User not found by ID`);
		return res.send({ ok: false, accessToken: '' });
	}

	if (user.tokenVersion !== payload.tokenVersion) {
		logger.error(
			`src:api:refreshToken::TokenVersion of the payload dosenot Match`
		);
		return res.send({ ok: false, accessToken: '' });
	}

	sendRefreshToken(res, createRefreshToken(user));

	return res.send({ ok: true, accessToken: createAccessToken(user) });
};

module.exports = refreshToken;
