var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
	// Our user will sign in using an email, rather than a "username"
	{ usernameField: "email" },
	async function(email, password, done) {
		// When a user tries to sign in this code runs
		const dbUser = await db.User.findOne({ where: { email: email } });
		// if (User does not exist OR incorrect password )
		if (!dbUser || !dbUser.validPassword(password)) {
			// Tell the user they failed to login.
			return done(null, false, { message: "Incorrect username or password." });
		}
		// If none of the above, return the user
		return done(null, dbUser);
	}
));

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(obj, done) { done(null, obj); });

// Exporting our configured passport
module.exports = passport;
