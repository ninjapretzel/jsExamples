// In order to install dependencies, we run 
// $> npm install
// in the console, in the same directory as our "package.json" file.

// This is what imports the express library:
const express = require('express')
// This is middleware, we include it to save us work understanding the content of requests
const bodyParser = require("body-parser");
// We use the library to create an application object
const app = express()

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.get("/index", function(req, res) {
	
	res.send("<h1>Hello World!</h1>\n\n");
});

app.post("/index", function(req, res) {
	console.log(req.body);
	res.send("<h1>Hello World!</h1>\n\n");
});

// Finally, we tell the app to start listening on some port:
const port = 3000
app.listen(port, function(){ 
	console.log(`Example app listening on port ${port}!`)
})