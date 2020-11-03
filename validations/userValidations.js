const { object, string } = require('yup');

const invalidEmail = 'Email is Invalid';
const inavalidPassword = 'Password not matching criteria';
const loginUserValidation = object().shape({
	email: string()
		.required()
		.email()
		.min(3, invalidEmail)
		.max(150, invalidEmail),
	password: string()
		.required()
		.min(3, inavalidPassword)
		.max(50, inavalidPassword),
	// .matches('[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]'),
	client: string().required(),
});

const loginWithTokenValidation = object().shape({
	token: string().required(),
	client: string().required(),
});

const registerUserValidation = object().shape({
	email: string()
		.required()
		.email()
		.min(3, invalidEmail)
		.max(150, invalidEmail),
	password: string()
		.required()
		.min(3, inavalidPassword)
		.max(50, inavalidPassword),
	firstName: string().required(),
	lastName: string().required(),
	client: string().required(),
});

const resetPasswordValidation = object().shape({
	token: string().required(),
	password: string()
		.required()
		.min(3, inavalidPassword)
		.max(50, inavalidPassword),
});

const changePasswordValidation = object().shape({
	oldPassword: string()
		.required()
		.min(3, inavalidPassword)
		.max(50, inavalidPassword),
	newPassword: string()
		.required()
		.min(3, inavalidPassword)
		.max(50, inavalidPassword),
});

const updateUserValidation = object().shape({
	firstName: string(),
	lastName: string(),
	email: string().email().min(3, invalidEmail).max(150, invalidEmail),
	bio: string(),
	image: string(),
});

module.exports = {
	loginUserValidation,
	registerUserValidation,
	loginWithTokenValidation,
	resetPasswordValidation,
	changePasswordValidation,
	updateUserValidation,
};
