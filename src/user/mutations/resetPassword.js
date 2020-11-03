const crypto = require('crypto');
const { resetPasswordValidation } = require('../../../validations');
const User = require('../../../models/UserModel');
const logger = require('../../../logger');
const sendTokens = require('../../../service/sendTokens');

const resetPassword = async (_root, { input }, { res }) => {
	try {
		await resetPasswordValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:user:mutations:resetPassword::Error validating resetPassword data `
		);
		throw new Error(err);
	}
	const { token, password } = input;
	logger.info(`src:user:resetPassword:: Token ${token}`);

	const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

	const user = await User.findOne({
		passwordResetToken: hashedToken,
		passwordResetExpires: { $gt: Date.now() },
	});

	if (!user) {
		logger.error(
			`src:user:mutations:resetPassword::Invalid Token or Token already expired`
		);
		throw new Error('Invalid Token or Token alreday expired');
	}

	try {
		user.password = password;
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		await user.save();

		return sendTokens(user, res);
	} catch (err) {
		logger.error(`src:user:mutations:resetPassword::`);
		throw new Error('Error resetting password');
	}
};

module.exports = resetPassword;
