const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

// TODO: Get this value from configuration
const SECRET = "thisIsNotAGoodSecret,ChangeMePlease"; 

function makeToken(user) {
	const token = jwt.sign(
		{ id: user.id, username: user.username },
		SECRET,
		{ expiresIn: 60 * 60 } // 1 hour
	);
	return token;
}

router.post("/changePassword", async function(req, res) {
	const { oldPassword, newPassword, confirmPassword, token } = req.body;
	
	if (!oldPassword || !newPassword || !confirmPassword || !token) {
		res.json({
			success: false,
			message: "Missing information"
		});
		return;
	}
	
	let id = null;
	let username = null;
	try {
		const unpacked = jwt.verify(token, SECRET);
		id = unpacked.id;
		username = unpacked.username;
	} catch (err) {
		res.json({
			success: false,
			message: "failed to unpack token",
			err,
		});
		return;
	}
	
	const check = await db.User.findOne( { _id: id } );
	console.log(check);
	if (!check) {
		res.json({
			success: false,
			message: "User no longer exists"
		});
		return;
	}
	
	const hash = check.hash;
	if (!await argon2.verify(hash, oldPassword)) {
		res.json({
			success: false,
			message: "Old password does not match current password"
		});
		return;
	}
	
	if (newPassword !== confirmPassword) {
		res.json({
			success: false,
			message: "new passwords do not match"
		});
		return;
	}
	
	check.hash = await argon2.hash(newPassword);
	
	try {
		await check.save();
	} catch (err) {
		res.json({
			success: false,
			message: "database error",
			err
		});
		return;
	}
	
	res.json({ success: true });
	
});

router.post("/login", async function(req, res) {
	
	const { username, password } = req.body;
	
	if (!username || !password) { 
		res.json({ 
			success: false,
			message: "Need to provide username and password" 
		});
		return;
	}
	
	const check = await db.User.findOne( { username } );
	if (!check) {
		res.json({ 
			success: false,
			message: "Bad username or password" 
		});
		return;
	}
	
	if (!await argon2.verify(check.hash, password)) {
		res.json({ 
			success: false,
			message: "Bad username or password" 
		});
		return;
	}
	
	const token = makeToken(check);
	
	res.json({ success: true, token });
});

router.post("/newuser", async function(req,res){
	const { username, password } = req.body;
	if (!username || !password) {
		res.json ({
			success:false,
			message: "Need to provide username and password"
		});
		return;
	}
	const check = await db.User.findOne( { username } );
	if (check) {
		res.json ({
			success:false,
			message: "Please provide a unique username, this user already exists"
		});
		return;
	}
	if (!check) {
		const hash = await argon2.hash(password)

		const user = await db.User.create({
			username: username,
			hash,
			role: "User",
		})
		
		const token = makeToken(user);
		res.json({
			success: true,
			token,
			message: "new user created"
		})
		return;
	}
})



module.exports = router;
