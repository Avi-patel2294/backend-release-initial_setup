const User = require('../../../models/UserModel');
const logger = require('../../../logger');

const sendEmail = require('../../../utils/sendEmail');

const forgotPassword = async (root, { email }, { req, res }) => {
	logger.info(`src:user:forgotPassword:: userEmail: ${email}`);
	const user = await User.findOne({ email });

	if (!user) {
		logger.info(`src:user:forgotPassword:: User not found`);
		throw new Error('Invalid email');
	}
	try {
		const resetToken = user.createPasswordResetToken();

		await user.save({ validateBeforSave: false });

		logger.info(`src:user:forgotPassword:: resetToken ${resetToken}`);
		sendEmail({
			from: 'Advertize <advertizepro.llc@gmail.com>',
			to: 'patel.jayk12@gmail.com',
			subject: 'Advertize - ResetPassword',
			text: `Your reset Password Token is ${resetToken}. You have 15 mins to reset your token`,
		});
		return true;
	} catch (err) {
		logger.error(
			`src:user:mutations:forgotPassword::Error Generating refreshtoken and Sending Email`,
			err
		);
		return true;
	}
};

module.exports = forgotPassword;
