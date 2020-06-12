const uuid = require('uuid').v4;

const fs = require("fs");
const express = require("express");
const router = express.Router();

const notes = require("../db/db.json");
console.log(`loaded ${notes.length} notes`);


router.get("/notes", function(request, response) {
	response.send(notes);
});

router.post("/notes", function(request, response) {
	const data = request.body;
	
	console.log("Got body:");
	console.log(data);
	
	// Verify that data is correct:
	// (fit this pattern) (for typescript users)
	// interface { title: string, text: string }
	
	// Make sure both are present and not empty
	if (data.title && data.text 
			&& typeof(data.title) === "string"
			&& typeof(data.text) === "string") {
		// We don't want to accidentally save
		// other things present in data,
		// so we'll construct and object with
		// only the data we want to save.
		const note = {
			title: data.title,
			text: data.text,
			id: uuid()
		}
		// notes.push(note);
		notes[notes.length] = note;
		
		// Node considers _this_ path from where the program begand from-
		// which in our case is "../server.js"
		// we're already 'up a folder',
		//		so we need to use current directory (.) 
		//		instead of parent directory (..)
		fs.writeFileSync("./db/db.json", JSON.stringify(notes));
	}
	
	response.send("Success!");
});

router.delete("/notes/:id", function(request, response) {
	
	
});

router.get("/*", function(request, response) {
	response.statusCode = 404;
	response.send('404, Please make request to an actual endpoint...'
			+ '<br><tt>' + uuid() + '</tt>' );
})

module.exports = router;