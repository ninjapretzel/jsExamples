// This is a script that will run to initialize our database
// I'm using 'request' to make the request from node to fake-json
// (this allows node to make web requests like the browser does)

const request = require("request-promise-native");

const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://localhost:27017';
const dbName = 'myproject';
const collectionName = 'persons';

async function main() {
	
	const result = await request({
		method: 'POST',
		uri: 'https://app.fakejson.com/q?unique=' + Math.random(),
		
		body: {
			token: '',
			data: {
				username: 'personNickname',
				email: 'internetEmail',
				lastLogin: {
					dateTime: 'dateTime|UNIX',
					ip: 'internetIP4'
				},
				// _repeat: 10
			}
		},
		json:true,
	});
	
	console.log(result);
	
	const client = await MongoClient.connect(dbUrl, { 
		useUnifiedTopology: true
	});
		 
	console.log("Connected successfully to database server");
		
	const db = client.db(dbName);
	const collection = db.collection(collectionName);
	
	if (Array.isArray(result)) {
		await collection.insertMany(result);
	} else {
		await collection.insert(result);
	}
		
	console.log("Done inserting into database");
	process.exit();
	
}



main();