# Security! 
## The code diff between a secure system and an insecure one may not be that much at all.  
## See [THIS DIFF](https://github.com/ninjapretzel/jsExamples/commit/be2735f9ae4a2f5d304e4f0067a893524fa17050) as an example.
Note how few lines changed: `+17, -30` out of `3 files` with `~200 lines` total between them.  
Most of the changes are just removed imports or minor structural changes.  

You always benefit from attempting to have a secure system,  
and there is little detriment other than not understanding the highly refined encryption the security relies on.

## HTTPS
HTTPS is a necessary part of any modern web application.  
If your app is in only HTTP, any data transfer to/from your application is _unencrypted_.  

Heroku automatically serves your applications over HTTPS, so there is nothing to worry about there,  
however- if you self-host, you will want to enable HTTPS somehow [letsencrypt](https://letsencrypt.org/) is a good solution!

## Storing passwords securely
First of all, don't __EVER__ store passwords in plaintext.  
this means, do not have a user record like this:
```json
{
	"_id":{"$oid":"5f52a52ff50a7cde33f161b4"},
	"firstName":"Bob",
	"lastName":"Saget",
	"username":"admin",
	"role":"admin",
	"password":"password"
}
```

Second of all, avoid weak hashes/checksums like CRC-32, eg
```
"password"	-->	0xbbeda74f
"awesome"	-->	0xf04e9163 
```
Hashes for common passwords are often distributed in "rainbow tables",  
and can easily be checked against a compromised database of CRC-32 or other common checksum algorithms.

Checksums are typically used for data integrity verification, instead of security.
(for example, the torrent protocols used by most modern system updates use them to make sure no mutations happen on transferred blocks of data)

Some people tried to use them for passwords, and they are _very_ insecure,
they are vulnerable to what are called "rainbow table attacks".

My suggestion is to use the `argon2` library to hash and verify hashed passwords.  

It can even be used from the command line (like any other npm package) after installing the package to your project.  
`argon2` provides return values of `Promise<>`, so we need to use `.then()` to work with them from the command line.  
Typically, I suggest to use `async` functions/lambdas to `await` the results of `argon2`'s methods.

`argon2.hash(password)` returns a promise, that when completed, has the hashed password as a `String`.  
`argon2.verify(hash, password)` returns a promise, that when completed, is either true, if they match, or false, otherwise.
```
$> npm i argon2
$> node
```
```js
Welcome to Node.js v12.13.0.
Type ".help" for more information.

> const argon2 = require("argon2");
undefined

> argon2.hash("password").then(console.log) // Hash "password"
Promise { <pending> }
$argon2i$v=19$m=4096,t=3,p=1$aZAhBFxhen3YlTwNPIYCIA$BESg0CzOvvrY11UIeSXxyJep1HHeSJguFcXQQdnooZ0 

> argon2.verify("$argon2i$v=19$m=4096,t=3,p=1$aZAhBFxhen3YlTwNPIYCIA$BESg0CzOvvrY11UIeSXxyJep1HHeSJguFcXQQdnooZ0", "password").then(console.log); // Verify that the hash matches "password"
Promise { <pending> }
true
```

This can be used, for example, to set up a default user record:
```json
{
	"_id":{"$oid":"5f52a52ff50a7cde33f161b4"},
	"firstName":"Bob",
	"lastName":"Saget",
	"username":"admin",
	"role":"admin",
	"hash":"$argon2i$v=19$m=4096,t=3,p=1$aZAhBFxhen3YlTwNPIYCIA$BESg0CzOvvrY11UIeSXxyJep1HHeSJguFcXQQdnooZ0"
}
```
The record barely changes. It could even not change at all, if you keep the field name of `"password"`.  
The hash is still just a `String`.

Trying to recover the original password from the hash is very difficult, even if you know the algorithm used.  
Unlike a CRC, a single password may hash to many different values, all of which are valid.  
all of the following hashes were generated with "password" as the source:  
```
$argon2i$v=19$m=4096,t=3,p=1$sqY1zL40zHZOaEv3uMOZ4w$yJLvx5tGI5SoXRfA/JG9mF91jLI4KYeozHkRKE6DRvg
$argon2i$v=19$m=4096,t=3,p=1$E0jFXXxPIEcC/FXCO8lJgg$IBsC6G9euJUv3xqjqLT9e+t2gTfGCBR23EMqFYavOxs
$argon2i$v=19$m=4096,t=3,p=1$dq2V3AcRdVzWkMrV053YfA$zKRBbH7v7nYeuyM6+WGogI+hummXzamViXgoXek2lK0
$argon2i$v=19$m=4096,t=3,p=1$aZAhBFxhen3YlTwNPIYCIA$BESg0CzOvvrY11UIeSXxyJep1HHeSJguFcXQQdnooZ0
$argon2i$v=19$m=4096,t=3,p=1$tn+RU2Sezv95NkTTDe6dqw$I2HdPGq85IdmE2Clgyq1FT9s5Md7XKD/ProbjqrSmWU
```
These password hashes are more secure than "checksums" like CRC-32.

Each hash uses multiple layers of encryption  
(basically, to store the password, and a "salt" used to 'uniquify' the result, plus other information)  
You don't need to know _how_ the encryption works, but, with `argon2` providing hashes, we have these benefits:
- If our database is ever compromised, the attacker does not get an easy win with plaintext passwords.
- If the same password is used by multiple users, a simple scan of the database for identical hashes will not reveal it.
- If the attacker wants to siphon a user's password, they need to spend a good deal of time guessing passwords.
	- This gives users ample time to change their password, if we find out we have a breach


## Signing sensitive data from server
The next important consideration is preventing users from being able to attack your app by forging requests.

It is necessary to send data from client to server to identify the user.  
When a user requests a password change, you need a way for the server to know what user made the request.  

To do this, the client would send some identifiable information (eg, a userID or username)- but this is insecure!  
Any user could send spoofed data to your server, if they know the ID/Name of another user (using tools like postman!),  
And we want to prevent such spoofed data from being accepted by our server as "legitimate".  

Enter- the JsonWebToken.
Again, I will demonstrate this package from the command line.

`jwt.sign(payload, secret[, options])` returns a `String` token, the `payload` encoded with the given `secret`.  
So long as you keep your `secret` safe, nobody can forge tokens. (Eg, only in an env var on the server/heroku dashboard)  
`options` can be provided (for example, to make the token expire after some amount of time).

`jwt.verify(token, secret)` will either return the signed `payload` from the previous `jwt.sign` method,  
or it will throw an exception, if it fails to verify the token was authentic.  
```
$> npm i jsonwebtoken
$> node
```
```js
Welcome to Node.js v12.13.0.
Type ".help" for more information.

> const jwt = require("jsonwebtoken");
undefined
> jwt.sign({id:"123123", username:"bobby"}, "SECRET-CODE"); // Sign some data with "SECRET-CODE"
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEyMyIsInVzZXJuYW1lIjoiYm9iYnkiLCJpYXQiOjE1OTkzNDIxNTl9.jOqPXS-uIE6ezjFzFGQc6aDZW695e6aFSl0qeumkEJ0'

> jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzEyMyIsInVzZXJuYW1lIjoiYm9iYnkiLCJpYXQiOjE1OTkzNDIxNTl9.jOqPXS-uIE6ezjFzFGQc6aDZW695e6aFSl0qeumkEJ0', "SECRET-CODE"); // Extract our data, making sure "SECRET-CODE" was used to sign it
{ id: '123123', username: 'bobby', iat: 1599342159 }
```

- _Note how a timestamp (`iat`) was added to the unpacked token._
	- _This is the time when the token was issued (`Issued AT`)._

The details of JWT are interesting, but unnecessary to understand for now.
Instead of just sending the username/id in plaintext, we encrypt the data in such a way that we gain these benefits:
- We can easily send the token data to the client. (It is just a `String`)
- The client can easily send the token data back to the server. (Again, it is just a `String`)
- We can verify (via the nature of the encryption used) that the token was made by our server, and not forged.
- We can extract the identifiable information from the token.


Moreover, it is increasingly preferable to do so in a way that works for more than just web-browsers.  

In code, you will probably include something like the following to test a login system
```js
const router = require("express").Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../wherever/your/db/is");
// Provided via Heroku console
// If it does get leaked, it can be changed-
// the only problem will be any existing logins are invalidated.
/** Configured JWT_SECRET environment variable */
const SECRET = process.env.JWT_SECRET || "DefaultSecretIsNotAGoodSecret"
/** Configured JWT_EXPIRY environment variable */
const EXPIRY = process.env.JWT_EXPIRY || (60 * 60) // default is 1 hour (60 sec*60 min)
/** Signs user data into a token. 
@param {object} employee - user data to sign
@returns {String} signed token using configured secret */
function signToken(user) {
	let token = { _id: employee._id, user: employee.username };
	return jwt.sign(token, SECRET, { expiresIn: EXPIRY });
}
/** Unpacks user data from a token.
@param {String} token - signed token
@returns {object | null} null if token is invalid, otherwise the signed data payload.*/
function unpackToken(token) {
	try {
		// Makes sure the server issued the token, 
		// and unpacks the above data payload (eg, {_id, username} )
		const unpacked = jwt.verify(token, SECRET); 
		return { _id: unpacked._id, username: unpacked.username };
	} catch (err) {
		return null; // Return value if token is invalid
	}
}
// For the sake of clarity, I have these functions for handling tokens:

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	// Make sure both things we need are provided
	if (!username || !password) { // prevent login if data is missing.
		res.json({ success: false, message: "Please provide username and password." });
		return;
	}
	// You would change the following line get your user model and find a user in your database.
	// Here, I am using mongoose, and have a schema similar to what is above.
	const user = await db.User.findOne({ username });
	if (!user) { // prevent login if user does not exist.
		res.json({ success: false, message: "Incorrect username or password" });
		return;
	}
	if (!await argon2.verify(user.hash, password)) { // prevent the login if passwords don't match
		res.json({ success: false, message: "Incorrect username or password" });
		return;
	}
	// @Important- the above two messages should be the same-
	// this makes it harder for attackers to guess if users already exist or not.
	
	// Log a message (for testing purposes)
	console.log(`user ${user.username} has logged in.`);
	
	// Finally, ID is verified, so sign a token and send it back to requester.
	const token = signToken(user);
	res.json({ success: true, token });	
});

router.post("/test", async (req, res) => {
	const { testData, token } = req.body;
	// Make sure both things we need are provided
	if (!testData || !token) { // prevent action if data is missing.
		res.json({ success: false, message: "Missing Information." });
		return;
	}
	// Attempt to unpack the required token, issued by the '/login' route.
	const userData = unpackToken(token);
	if (!userData) { // prevent action if token is invalid
		res.json({ success: false, message: "Invalid login, your session may have expired." });
		return;
	}
	// Find a user matching the token we issued...
	const user = await db.User.findOne(userData);
	if (!user) { // prevent action if user was deleted
		res.json({ success: false, message: "User no longer exists." });
		return;
	}
	
	// log a message (for testing purposes)
	// This is where any action the user actually requested would be preformed.
	console.log(`action '/test' requested by user ${user.username} with data: "${testData}"`);
	
	// Finally, respond with success!
	res.json({success: true, echo: testData});
}

module.exports = router;
```



