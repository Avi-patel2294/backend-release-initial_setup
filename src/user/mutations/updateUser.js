const { updateUserValidation } = require('../../../validations');
const User = require('../../../models/UserModel');
const logger = require('../../../logger');

const updateUser = async (_root, { input }, { req }) => {
	try {
		await updateUserValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:user:mutations:updateUser::Error validating updateUser data`,
			err
		);
		throw new Error(err);
	}

	if (!req.isAuth) {
		logger.error(`src:user:mutations:updateUser::User is not Authorized`);
		throw new Error('User is not Authorized');
	}

	try {
		const { firstName, lastName, email, bio, image } = input;
		logger.info(
			`src:user:mutations:updateUser:: firstName ${firstName} :: lastName  ${lastName} :: email ${email} :: bio ${bio} :: image ${image}`
		);
		const user = await User.findById(req.userId);

		if (firstName && firstName !== null && firstName !== '') {
			user.firstName = firstName;
		}
		if (lastName && lastName !== null && lastName !== '') {
			user.lastName = lastName;
		}
		if (email && email !== null && email !== '') {
			user.email = email;
		}
		if (bio && bio !== null && bio !== '') {
			user.bio = bio;
		}
		if (image && image !== null && image !== '') {
			user.image = image;
		}

		logger.info(`src:user:mutations:updateUser:: user data befor update`, user);
		const updateUserData = await User.findByIdAndUpdate(req.userId, user, {
			new: true,
		});

		return updateUserData;
	} catch (err) {
		logger.error(
			`src:user:muations:updateUser:: Error updating user Information`
		);
		throw new Error(err);
	}
};

module.exports = updateUser;
