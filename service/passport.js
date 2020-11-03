const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

const User = require('../models/UserModel');
// LOCAL STRATEGY
passport.use(
	new LocalStrategy(
		{
			usernameField: 'email'
		},
		async (email, password, done) => {
			try {
				// Find the user given the email
				const user = await User.findOne({ email: email });

				// If not, handle it
				if (!user) {
					return done(null, false);
				}

				// Check if the password is correct
				const isMatch = await user.isValidPassword(password);

				// If not, handle it
				if (!isMatch) {
					return done(null, false);
				}

				// Otherwise, return the user
				done(null, user);
			} catch (error) {
				done(error, false);
			}
		}
	)
);
