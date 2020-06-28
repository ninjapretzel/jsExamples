const mysql = require("mysql2/promise");

module.exports = mysql.createConnection({
	host: "localhost",
	user: 'root',
	password: 'D3MvMQlwLS6GLG9dUeg3',
	database: 'burgerApp',
});