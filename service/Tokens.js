const { sign } = require('jsonwebtoken');

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require('../config');

const createAccessToken = (user) => {
	return sign({ id: user._id }, ACCESS_TOKEN_SECRET, {
		expiresIn: '1d',
	});
};

const createRefreshToken = (user) => {
	return sign(
		{ id: user._id, tokenVersion: user.tokenVersion },
		REFRESH_TOKEN_SECRET,
		{
			expiresIn: '7d',
		}
	);
};

const sendRefreshToken = (res, token) => {
	res.cookie('artid', token, {
		httpOnly: true,
	});
};

module.exports = { createAccessToken, createRefreshToken, sendRefreshToken };
