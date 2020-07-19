
const mongoose = require("mongoose");
const config = require("../config");
mongoose.connect(`mongodb://${config.db.url}`, {useNewUrlParser:true, useUnifiedTopology:true});

const fs = require("fs");
const path = require("path");
const basename = path.basename(__filename);

const db = {
	schemas: {}
};

const files = fs.readdirSync(__dirname)
	.filter( it => it !== basename && it.endsWith(".js") )

for (let file of files) {
	const name = file.replace(".js","");
	const schema = require(path.join(__dirname, file));
	const model = mongoose.model(name, schema);
	db.schemas[name] = schema;
	db[name] = model;
	
	
}
db.conn = mongoose;


module.exports = db;
