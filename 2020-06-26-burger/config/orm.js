const connection = require("./connection");

// Glue code because node doesn't have async imports.
let conn = null;
async function waitForConnection() {
	conn = await connection;	
}
waitForConnection();

module.exports = {
	selectAll: async function(table) {
		const query = `SELECT * FROM \`${table}\``;
		const params = [ ];
		
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
		const fields = Object.keys(data)
			.filter( key => (key !== "id") )
			.map( it => `\`${it}\``)
			.join(", ");
		const values = Object.keys(data)
			.filter( key => (key !== "id") )
			.map( key => data[key] );
		const placeholder = Array(values.length).join("?, ") + "?";
		
		const query = `INSERT INTO \`${table}\` (${fields}) VALUES (${placeholder})`;
		const params = values;
		
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
		
		let sets = "";
		for (let i = 0; i < fields.length; i++) {
			sets += ' `' + fields[i] + '`=' + values[i];
		}
		
		const query = `UPDATE \`${table}\` SET ${sets} WHERE \`id\`=?`;
		const params = [ id ];
		
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