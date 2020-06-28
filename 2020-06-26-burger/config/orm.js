const connection = require("./connection");

// Glue code because node doesn't have async imports.
let conn = null;
async function waitForConnection() {
	conn = await connection;	
}
waitForConnection();

module.exports = {
	selectAll: async function(table) {
		const query = "SELECT * FROM ?";
		const params = [ table ];
		
		try {
			let [result] = await conn.execute(query, params);
			
			return result;
		} catch (err) {
			console.log(`Error reading from table ${table}.`);
			console.log(err);
			
			return [];
		}
	},
	insertOne: async function(table, data) {
		const query = "INSERT INTO ? (?) VALUES (?)";
		const fields = Object.keys(data).filter( key => (key !== "id") );
		const values = fields.map( key => data[key] );
		
		const params = [ table, fields, values ];
		
		try {
			let [result] = await conn.execute(query, params);
			return result.insertId;
		} catch (err) {
			console.log(`Error inserting into table ${table}.`);
			console.log(err);
			
			return -1;
		}
	},
	updateOne: async function(table, id, fields, values) {
		const query = "UPDATE ? SET ? WHERE `id`=?";
		
		let sets = "";
		for (let i = 0; i < fields.length; i++) {
			sets += ' `' + fields[i] + '`=' + values[i];
		}
		
		const params = [ table, sets, id ];
		
		try {
			let [result] = await conn.execute(query, params);
			return 0;
		} catch (err) {
			console.log(`Error updating ${id} in table ${table}.`);
			console.log(err);
			
			return -1;
		}
		
	},
		
		
		
}