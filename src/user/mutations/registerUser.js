const { registerUserValidation } = require('../../../validations');
const User = require('../../../models/UserModel');
// const sendTokens = require('../../../service/sendTokens');
const logger = require('../../../logger');

const registerUser = async (root, { input }, { req }) => {
	try {
		await registerUserValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:user:mutations:registerUser::Error validating registerUser Input`,
			err
		);
		throw new Error(err);
	}
	const { firstName, lastName, email, password } = input;
	logger.info(
		`src:user:mutations:registerUser:: firstName ${firstName} :: lastName  ${lastName} :: email ${email}`
	);
	const user = await User.findOne({ email });

	if (user) {
		logger.error(
			`src:user:mutations:registerUser:: Email ${email} already registered`
		);
		throw new Error('User already exits');
	}

	try {
		const newUser = await new User({
			firstName,
			lastName,
			email,
			password,
		}).save();

		req.session.userId = newUser._id;
		return true;
	} catch (err) {
		logger.error(
			`src:user:mutations:registerUser::Error Saving data to table`,
			err
		);
		throw new Error(err);
	}
};

module.exports = registerUser;
