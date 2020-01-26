
module.exports = function(app) {

	app.get("/index", function(req, res) {
		
		res.send("<h1>Hello World!</h1>\n\n");
	});

	app.post("/index", function(req, res) {
		console.log(req.body);
		res.send("<h1>Hello World!</h1>\n\n");
	});
	
}
