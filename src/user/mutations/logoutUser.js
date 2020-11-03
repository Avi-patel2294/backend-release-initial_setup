const { sendRefreshToken } = require('../../../service/Tokens');

const logoutUser = async (_root, _args, { res }) => {
	sendRefreshToken(res, '');
	return true;
};

module.exports = logoutUser;
