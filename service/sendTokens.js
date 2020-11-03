const {
	createAccessToken,
	createRefreshToken,
	sendRefreshToken,
} = require('./Tokens');

const sendTokens = (user, res) => {
	const accessToken = createAccessToken(user);
	const refreshToken = createRefreshToken(user);

	sendRefreshToken(res, refreshToken);

	return {
		accessToken,
		refreshToken,
	};
};

module.exports = sendTokens;
