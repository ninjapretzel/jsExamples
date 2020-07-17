const { Sequelize, DataTypes } = require('sequelize');
const fs = require('fs');

const config = require("../config");
const db =  {};
db.sequelize = new Sequelize(config.database,
							config.username,
							config.password, config);

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
