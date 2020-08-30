const express = require("express");
const db = require("../db");

const router = express.Router();

function makeToken(user) {
	const token = { id: user.id, username: user.username, created: new Date().getTime() };
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
	
	const unpacked = token
	id = unpacked.id;
	username = unpacked.username;
	
	const now = new Date().getTime();
	if (now - unpacked.created > (1000 * 60 * 60)) {
		res.json({
			success: false,
			message: "Session expired"
		});
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
	
	if (check.password !== oldPassword) {
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
	
	check.password = newPassword;
	
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
	
	if (check.password !== password) {
		res.json({ 
			success: false,
			message: "Bad username or password" 
		});
		return;
	}
	
	const token = makeToken(check);
	
	res.json({ success: true, token });
});

router.post("/newUser", async function(req,res) {
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
	
		const user = await db.User.create({
			username,
			password,
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
