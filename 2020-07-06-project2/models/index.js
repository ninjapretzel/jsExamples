const { Sequelize, DataTypes } = require('sequelize');	
const fs = require('fs');

const db =  {};
db.sequelize = new Sequelize("dev", "root", "", {
	host: 'localhost',
	dialect: "mysql",
	port: 3306,
});

const files = fs.readdirSync(__dirname)
	.filter(filename => filename.slice(-3) === '.js' && filename !== 'index.js')

for (let filename of files) {
	let module = require("./" + filename);
	if (module.init) {
		module.init(db.sequelize);	
		db[module.name] = module;
	}
}

module.exports = db;