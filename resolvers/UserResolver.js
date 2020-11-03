const User = require('../models/UserModel');
const Advertize = require('../models/AdvertizeModel');

const loginUser = require('../src/user/mutations/loginUser');
const loginWithToken = require('../src/user/mutations/loginWithToken');
const logoutUser = require('../src/user/mutations/logoutUser');
const registerUser = require('../src/user/mutations/registerUser');
const updateUser = require('../src/user/mutations/updateUser');
const forgotPassword = require('../src/user/mutations/forgotPassword');
const getLoggedInUser = require('../src/user/queries/getLoggedInUser');
const resetPassword = require('../src/user/mutations/resetPassword');
const changePassword = require('../src/user/mutations/changePassword');

exports.default = {
	Query: {
		getAllUser: () => {},
		getLoggedInUser: getLoggedInUser,
		getCurrentUserListingCount: async (root, { email }) => {
			const user = await User.findOne({ email: email });
			const getListingCount = await Advertize.find({
				user: user._id,
			}).count();

			return { count: getListingCount };
		},
		getUserListingCount: async (_root, { id }) => {
			const getListingCount = await Advertize.find({
				user: id,
			}).count();

			return { count: getListingCount };
		},
	},
	Mutation: {
		registerUser: registerUser,
		updateUser: updateUser,
		loginWithToken: loginWithToken,
		loginUser: loginUser,
		logoutUser: logoutUser,
		forgotPassword: forgotPassword,
		resetPassword: resetPassword,
		changePassword: changePassword,
	},
};
