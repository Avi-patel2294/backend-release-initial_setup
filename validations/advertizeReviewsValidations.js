const { object, string, number } = require('yup');

module.exports = object({
	review: string().required(),
	rating: number().positive().integer().min(1).max(5),
	userId: string().required(),
	advertizeId: string().required(),
});
