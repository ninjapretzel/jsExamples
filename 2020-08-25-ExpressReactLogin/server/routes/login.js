const express = require("express");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();

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
	
	const token = jwt.sign(
		{ id: check.id, username: check.username },
		"thisIsNotAGoodSecret,ChangeMePlease",
		{ expiresIn: 60 * 60 } // 1 hour
	);
	
	res.json({ success: true, token });
});


module.exports = router;
