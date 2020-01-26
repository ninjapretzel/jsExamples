// In order to install dependencies, we run 
// $> npm install
// in the console, in the same directory as our "package.json" file.

// This is what imports the express library:
const express = require('express')

// We use the library to create an application object
const app = express()

app.use(express.urlencoded( { extended: true } ));
app.use(express.json());

require("./routes")(app);
require("./apis/userInfo")(app);

// Finally, we tell the app to start listening on some port:
const port = 3000
app.listen(port, function(){ 
	console.log(`Example app listening on port ${port}!`)
})