const axios = require("axios");
const mongodb = require("mongodb");
const config = require("../config.js");

const url = `mongodb://${config.db.host}:${config.db.port}`
const token = "bOv8fGzwmssMgPEq3vsnpA";
const dbName = config.db.name;
const MongoClient = mongodb.MongoClient;

const client = new MongoClient(url, { useUnifiedTopology: true });

async function main() {
	await client.connect();
	
	const db = await client.db(dbName);
	
	for (let key in config.populate) {
		const collection = db.collection(key);
		
		const result = await axios({
			method: "post",
			url: "https://app.fakejson.com/q",
			data: { token, data: config.populate[key] }
		});
		
		console.log(result.data);
		
		const insertResult = await collection.insertMany(result.data);
		
		console.log(insertResult);
		
		
		
	}
	
	
	
	
}
main();
