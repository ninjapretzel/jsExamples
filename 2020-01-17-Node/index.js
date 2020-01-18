// Include this to read stuff from the filesystem
const fs = require('fs')
// This is middleware, we include it to save us work understanding the content of requests
const bodyParser = require("body-parser");

// This is what imports the express library:
const express = require('express')
// We use the library to create an application object
const app = express()

// We then configure our application and middleware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// function onRequest(req, res, next) {
// 	if (req.body && typeof(req.body) === "string") {
// 		req.body = JSON.parse(req.body);	
// 	}
// 	next();
// }

var count = 0;
// We also load any stuff our app needs, for example, we load the saved count from disk.
fs.readFile("data.json", (err, data) => {
	if (err) {
		// If error, do nothing
		return;
	}
	console.log("loaded data.json: " + data);
	var obj = JSON.parse(data)
	// Once loaded, we assign that global variable to hold the count
	count = obj.count;
})

// We also configure the application's endpoints as we desire
// When 'website' (the root of our site) is requested with GET
app.get('/', (req, res) => { 
	// Read the 'index.html' page...
	fs.readFile("index.html", (err, file) => {
		// and send all the content to the client
		res.send(file + "\n\n")
	})
})

// When `website/count` is requested with GET...
app.get("/count", (req, res) => {
	// We read the count, and wrap it in an object.
	// var obj = { count } // shorthand for `{ count: count }`
	var obj = {};
	obj.count = count;
	var str = JSON.stringify(obj) // Turn the object into a string

	// And send the string to the client
	res.send(str + "\n\n");
})

// When `website/count` is requested with POST...
app.post("/count", (req, res) => {
	// Read some information from the post request's body...
	// This is data the client sent to our server.
	
	// Figure out customer's order
	// and how to handle it 
	if (req.body.dir === "down") {
		count--;
	}
	if (req.body.dir === "up") {
		count++;
	}
	
	// Figure out the response for the customer
	var obj = { count }
	
	// Turn it into 'english'
	var str = JSON.stringify(obj)

	// tell the customer
	res.send(str + "\n\n");
})

process.on('SIGINT', () => process.exit())
process.on('exit', () => {
	console.log("actually exiting now");
	
	var data = {
		count
	}
	fs.writeFileSync("data.json", JSON.stringify(data))
});

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))