const { changePasswordValidation } = require('../../../validations');
const bcrypt = require('bcrypt');
const User = require('../../../models/UserModel');
const logger = require('../../../logger');
const sendTokens = require('../../../service/sendTokens');

const changePassword = async (_, { input }, { req, res }) => {
	try {
		await changePasswordValidation.validate(input);
	} catch (err) {
		logger.error(
			`src: user:mutations:changePassword:changePassword:: Error validating changePassword Input data`
		);
	}
	const { oldPassword, newPassword } = input;
	if (req.isAuth && req.userId) {
		try {
			const user = await User.findById(req.userId);
			if (!user) {
				logger.error(`src:user:muattions:changePassword::error finding user`);
				throw new Error('User not found');
			}
			const validateOldPassword = await bcrypt.compare(
				oldPassword,
				user.password
			);

			if (!validateOldPassword) {
				logger.error(`src:user:muattions:changePassword::Invalid old password`);
				throw new Error('Invalid Old Password');
			}

			user.password = newPassword;
			user.save();
			return sendTokens(user, res);
		} catch (err) {
			logger.error(
				`src:user:muattions:changePassword::error finding user and changing password`,
				err
			);
			throw new Error(err);
		}
	} else {
		logger.error(`src:user:mutations:changePassword:: user is not authorized`);
		throw new Error('User Not Authorized');
	}
};

module.exports = changePassword;
