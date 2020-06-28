const connection = require("./connection");

// Glue code because node doesn't have async imports.
let conn = null;
async function waitForConnection() {
	conn = await connection;	
}
waitForConnection();

module.exports = {
	selectAll: async function(table) {
		
	},
	insertOne: async function(table, data) {
		
	},
	updateOne: async function(table, data) {
		
	},
}