const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
	},
	firstName: {
		type: String,
	},
	lastName: {
		type: String,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		lowercase: true,
	},
	password: {
		type: String,
		required: true,
	},
	type: {
		type: String,
	},
	bio: {
		type: String,
	},
	image: {
		type: String,
	},
	userRole: {
		type: String,
		enum: ['advertizer', 'admin'],
		default: 'advertizer',
	},
	tokenVersion: {
		type: Number,
		default: 0,
	},
	isEmailVerified: {
		type: Boolean,
		default: false,
	},
	verificationToken: {
		type: String,
	},
	joinDate: {
		type: Date,
		default: Date.now,
	},
	passwordResetToken: String,
	passwordResetExpires: Date,
});

UserSchema.pre('save', function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	bcrypt.genSalt(12, (err, salt) => {
		if (err) return next(err);

		bcrypt.hash(this.password, salt, (error, hash) => {
			if (error) return next(error);
			this.password = hash;
			next();
		});
	});
});

UserSchema.methods.isValidPassword = async function (newPassword) {
	try {
		return await bcrypt.compare(newPassword, this.password);
	} catch (error) {
		throw new Error(error);
	}
};

UserSchema.methods.createPasswordResetToken = function () {
	const resetToken = crypto.randomBytes(32).toString('hex');
	this.passwordResetToken = crypto
		.createHash('sha256')
		.update(resetToken)
		.digest('hex');
	this.passwordResetExpires = Date.now() + 15 * 60 * 1000;

	return resetToken;
};
module.exports = mongoose.model('User', UserSchema);
