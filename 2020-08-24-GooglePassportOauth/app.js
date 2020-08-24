const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

mongoose.connect(`mongodb://localhost:27017`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const UserSchema = new Schema( { 
	googleID: { type: String } 
});
const User = mongoose.model("User", UserSchema);


const passport = require('passport');
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const creds = require("./credentials.json");
passport.use(new GoogleStrategy({
	clientID: creds.web.client_id,
	clientSecret: creds.web.client_secret,
	callbackURL: "localhost:3000/loginSuccess"
}, async function(accessToken, refreshToken, profile, done) {
	
	let user = await User.findOne({ googleID: profile.id });
	
	if (!user) { // No user, create one!
		user = await User.create({ googleID: profile.id });
	}
	
	done(null, user);
} ));



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/auth/google', 
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] })
);

app.get('/loginSuccess', 
	passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'], failureRedirect: '/login' }),
	function(req, res) {
		res.redirect('/');
	}
);


const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
