const express = require("express");
const session = require("express-session");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));


async function main() {
	// await db.sequelize.sync();
	
	app.listen(PORT, function() {
		console.log(`Listening on ${PORT}. http://localhost:${PORT}`);
	});
}
main();