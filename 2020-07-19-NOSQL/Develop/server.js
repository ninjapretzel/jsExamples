const express = require("express");
const PORT = process.env.PORT || 3000;

const db = require("./models");

const app = express();
app.use(express.urlencoded( { extended: true } ));
app.use(express.json());
app.use(express.static("public"));

const workoutApi = require("./routes/workout-api");
app.use('/', workoutApi);

async function main() {
	app.listen(PORT, function() {
		console.log(`App listening. http://localhost:${PORT}`);
	})
	
}
main();
