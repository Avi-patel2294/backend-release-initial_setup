const fetch = require('isomorphic-unfetch');
const { loginWithTokenValidation } = require('../../../validations');
const User = require('../../../models/UserModel');
const logger = require('../../../logger');
const sendTokens = require('../../../service/sendTokens');

const loginWithToken = async (_root, { input }, { res }) => {
	try {
		await loginWithTokenValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:user:muations:lofinWithToken::Error validating loginwithToken Data`
		);
		throw new Error(err);
	}
	const { token, client } = input;
	logger.info(
		`resolver:UserResolver::loginWithToken:: Token:: ${token} :: Client: ${client}`
	);
	let userInfo;
	if (client === 'facebook') {
		const response = await fetch(
			`https://graph.facebook.com/me?access_token=${token}&fields=name,email,about,picture`
		);
		userInfo = await response.json();
	}
	if (client === 'google') {
		const response = await fetch(
			'https://www.googleapis.com/oauth2/v3/userinfo',
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		userInfo = await response.json();
	}
	if (!userInfo) {
		logger.error(
			`src:user:mutations:lofinWithToken::User info not found based on token and client data`
		);
		throw new Error('Invalid Token');
	}

	const user = await User.findOne({ email: userInfo.email });
	if (!user) {
		const { name, email, picture } = userInfo;
		let image = '';
		if (client === 'facebook') {
			image = picture.data.url;
		}
		if (client === 'google') {
			image = picture;
		}

		try {
			const newUser = await new User({
				name,
				email,
				image,
			}).save();
			return sendTokens(newUser, res);
		} catch (err) {
			logger.error(
				`src:user:mutations:loginWithToken::Error creating new user from token`
			);
			throw new Error(err);
		}
	}
	return sendTokens(user, res);
};

module.exports = loginWithToken;
