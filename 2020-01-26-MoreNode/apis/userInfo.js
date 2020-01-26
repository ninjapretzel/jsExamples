const mysql = require("mysql2");

const connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	// This is the password for my development mySQL db
	// (which is never accessible externally)
	// You will need to use your own password.
	password: "password",
	port: 3306,
	database: "animals_db"
});

connection.connect( function(err) {
	if (err) { throw err; }
	console.log(`Successfully Connected! tid=${connection.threadId}`);	
})

module.exports = function(app) {
	app.get("/people/:name", function(req, res) {
		let name = req.params.name;
		
		let query = `SELECT * FROM people WHERE name=?;`
		
		connection.query(query, [name], function(err, data) {
			console.log("Query complete!");
			console.log(data);
			
			let str = "Okay here's the info for " + name;
			if (!data || data.length == 0) {
				str = "No person " + name + " found."	
			} else {
				str += "<br>";
				if (data[0].has_pet) {
					str += "They have a pet named " + data[0].pet_name + ".";
					str += "<br>" + data[0].pet_name + " is " + data[0].pet_age + " years old.";
				} else {
					str += "They have no pet.";	
				}
			}
			
			res.send(str )
		});
		
		
	});
	
	
	app.get("/api/people/:name", function(req, res) {
		let name = req.params.name;
		let query = `SELECT * FROM people WHERE name=?;`
		
		
		connection.query(query, [name], function(err, data) {
			let r = {};
			if (!data || data.length == 0) {
				r.present = false;
			} else {
				r.present = true;
				r.name = data[0].name;
				r.hasPet = data[0].has_pet;
				r.petName = data[0].pet_name;
				r.petAge = data[0].pet_age;
			}
			res.json(r);
		});
	});
		
}