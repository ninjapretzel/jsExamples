
const express = require("express")
const exphbs = require(`express-handlebars`);

const app = express()
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

const mysql = require("mysql2");
const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "PASSWORD",
	port: 3306,
	database: "animals_db"
});

connection.connect( function(err) {
	if (err) { throw err; }
	console.log(`Successfully Connected! tid=${connection.threadId}`);	
})

let lunches = [
	{
		lunch: "Chicken Sandwich"	
	},
	{
		lunch: "Pot Roast"
	}
]

//Routes
app.get("/weekday", function(req,res) {
	res.render("index", lunches[0]);
});
app.get("/weekend", function(req,res) {
	res.render("index", lunches[1]);
});

app.get("/lunches", function(req,res) {
	res.render("all-lunches", { 
		foods: lunches,
		eater: "bob saget"
	});
});

app.get("/people/:name", function(req,res) {
	let name = req.params.name;
	let query = `SELECT * FROM people WHERE name=?;`
	connection.query(query, [name], function(err, data) {
		let context = data[0] || { };
		console.log(context);
		res.render("person", context);
	});
		
});
app.get("/people/search/:name", function(req,res) {
	let name = `%${req.params.name}%`;
	let query = `SELECT * FROM people WHERE name LIKE ?;`
	connection.query(query, [name], function(err, data) {
		console.log(data);
		//let context = data[0] || { };
		//console.log(context);
		res.render("people", {people:data});
	});
		
});

let PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
	console.log("Lunch server listening on http://localhost:" + PORT);	
})