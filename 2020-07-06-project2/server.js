const express = require("express");
const session = require("express-session");
const handlebars = require("express-handlebars");
const db = require("./models");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine("handlebars", handlebars( {defaultLayout: "main"} ) );
app.set("view engine", "handlebars");

app.get("/", async (request, response) => {
	response.render('index', { timestamp: new Date() });
});



async function main() {
	await db.sequelize.authenticate();
	await db.sequelize.sync();
	
	
	app.listen(PORT, function() {
		console.log(`Listening on ${PORT}. http://localhost:${PORT}`);
	});
}
main();