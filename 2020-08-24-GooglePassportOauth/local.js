/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// db.js:
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

mongoose.connect(`mongodb://localhost:27017/localAuthExample`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const UserSchema = new Schema( { 
	username: { type: String },
	hash: { type: String } 
});
const User = mongoose.model("User", UserSchema);
// Would export generated models:
//module.exports = { User };

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// passportConfig.js:
// const { User } = require('./db'); // Uncomment once separated
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');
passport.use(new LocalStrategy(async function(username, password, done) {
	
	let user = await User.findOne({ username });
	
	console.log(`Found User?`, user);
	// If we don't have a user, create one
	if (!user) {
		// hash the password from the user
		let hash = await argon2.hash(password);
		// Create a User record, with the hash stored (not the plaintext password!)
		user = await User.create({ username, hash });
		console.log(`Creating user.`, user);
		// Success, call done with the user data!
		return done(null, user);
	}
	
	// Check that hashes match
	// if (user.hash !== hash(password)) 
	if (!await(argon2.verify(user.hash, password))) {
		console.log(`password mismatch.`, user);
		return done(null, false, { message: "Invalid username or password" });
		
	}
	
	console.log(`Logged in as existing user.`, user);
	// Success!
	return done(null, user);
} ));
passport.serializeUser(async function(user, done) {
	console.log("in serialize");
	return done(null, user.username);
});
passport.deserializeUser(async function(username, done) {
	console.log("in deserialize");
	let user = await User.findOne({username})
	if (user) { return done(null, { username: user.username} ); }
	else { return done("User not found!", null); }
});
// Would export the configured passport:
// module.exports = passport;

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////
// server.js:
const express = require('express')
const bodyParser = require('body-parser')
const session = require("express-session");
const cookieParser = require("cookie-parser");
// const passport = require('./passportConfig'); // uncomment when separated
const app = express()

// Hook up application middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({ 
	secret: 'keyboard cat', 
	resave: false,
	saveUninitialized: true,
	cookie: {} 
}));
app.use(passport.initialize());
app.use(passport.session());

// Simple static login page
app.get('/', function(req, res) {
	res.send(`<form action="/login" method="post">
    <div>
        <label>Username:</label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label>Password:</label>
        <input type="password" name="password"/>
    </div>
    <div>
        <input type="submit" value="Log In"/>
    </div>
</form>`);
});

// POST route for user login
app.post('/login',
	passport.authenticate('local', { // Let passport use our strategy to authenticate
		successRedirect: '/loginSuccess', // On success, hit this route
		failureRedirect: '/loginFailed', // On failure, hit this route
	}),
);

// Route shown once the user logs in
app.get('/loginSuccess',
	async function(req, res) {
		if (req.user) { // Check that the user is logged in
			res.send(`<h1> success! you are logged in as ${req.user.username}!</h1>`);
		} else {
			res.send(`<h2> you are not logged in, cheater!</h2>`);
		}
});

// Route shown once the user fails to login
app.get('/loginFailed',
	async function(req, res) {
		// Page can be viewed without a login
		res.send(`<h1> Oops, you are not logged in </h1>`);
	}
);

// Finally, start the app
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
