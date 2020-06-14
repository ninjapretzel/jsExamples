const uuid = require('uuid').v4;

const fs = require("fs");
const express = require("express");
const router = express.Router();

const notes = require("../db/db.json");
if (!isArray(notes)) {
	console.log("Error! notes should be an array, please check 'db/db.json!'");
	process.exit(1); // Exit before running rest of program,
	// this will prevent the program from starting up, 
	// which is sometimes the proper way to handle such errors
}

console.log(`loaded ${notes.length} notes`);

// typeof({}) === object, but also
// typeof([]) === object-  but it's an array!
// Javascript arrays are technically objects!
// (they have `Array` as their prototype!)
// so we need to go a step further,
// and make sure that the thing is actually
// not an array using the `Array.isArray` method
function isObject(it) {
	return typeof(it) === "object" && (!Array.isArray(it));
}
function isArray(it) {
	return typeof(it) === "object" && (Array.isArray(it));
}

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
	if (isObject(data) && data.title && data.text 
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
		try {
			fs.writeFileSync("./db/db.json", JSON.stringify(notes));
		} catch (err) {
			console.log("Could not save db.json:");
			console.log(err);
			response.statusCode = 500;
			response.send("Error writing file, could not save note!");
			return;
		}
		response.send("Success!");
	} else {
		response.statusCode = 400;
		response.send("Error, bad data, could not save note!");	
	}
	
});

router.delete("/notes/:id", function(request, response) {
	const id = request.params.id;
	
	for (let i = 0; i < notes.length; i++) {
		if (id === notes[i].id) {
			notes.splice(i, 1); // Remove 1 element starting at index i
			try {
				fs.writeFileSync("./db/db.json", JSON.stringify(notes));
			} catch (err) {
				console.log("Could not save db.json:");
				console.log(err);
				response.statusCode = 500;
				response.send("Error writing file, could not delete note!");
				return;
			}
			response.send("Success!");
			return;
		}
	}
	response.send("No note with matching id!");
});

router.get("/*", function(request, response) {
	response.statusCode = 404;
	response.send('404, Please make request to an actual endpoint...'
			+ '<br><tt>' + uuid() + '</tt>' );
})

module.exports = router;