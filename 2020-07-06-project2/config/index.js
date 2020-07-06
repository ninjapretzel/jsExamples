
const config = {
	username: "root",
	password: "",
	database: "dev",
	host: "localhost",
	port: 3306,
	dialect: "mysql"
}

try {
	const loaded = require("../customConfig");
	
	module.exports = { ...config, ...loaded };
} catch (err) {
	module.exports = config;
}