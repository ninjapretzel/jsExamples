// to configure application, create a file called 'customConfig.js'
// in that file, export an object with any of these fields defined
// to change that option.
// Currently, none are required.
// the `customConfig.js` file is not included in source control,
// so it is a safe place to store the database password.

module.exports = {
	//	username for sql server
	username: "root",
	//	password for sql user
	password: "",
	//	sql database to use
	database: "dev",
	//	sql database host
	host: "localhost",
	//	sql database port
	port: 3306,
	//	sql database dialect (one of 'mysql' | 'mariadb' | 'postgres' | 'mssql')
	dialect: "mysql"
}