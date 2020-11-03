const bcrypt = require('bcrypt');
const { loginUserValidation } = require('../../../validations');
const User = require('../../../models/UserModel');
const logger = require('../../../logger');

const loginUser = async (root, { input }, { req, res }) => {
	try {
		await loginUserValidation.validate(input);
	} catch (err) {
		logger.error(
			`src:user:mutations:loginUser::Error Validating loginUser Input Data`,
			err
		);
		throw new Error(err);
	}

	const { email, password, client } = input;
	const user = await User.findOne({ email });

	if (!user) {
		logger.error('src:mutations:user::loginUser: User not found error');
		throw new Error('Invalid Username');
	}

	if (client === 'email') {
		const isvalidPassword = await bcrypt.compare(password, user.password);

		if (!isvalidPassword) {
			logger.error('src:user:mutation::loginUser: Invalid Password error');
			throw new Error('Invalid Password');
		}
		req.session.userId = user._id;
		req.userId = user._id;
	}

	return true;
};

module.exports = loginUser;
