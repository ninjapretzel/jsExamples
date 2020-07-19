const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'myproject';

MongoClient.connect(url, { useUnifiedTopology: true }, async function(err, client) {
	console.log("Connected successfully to server");
	
	// Databases in mongo are just like databases in sql
	// one server may have many databases....
	const db = client.db(dbName);
	// collections in mongo are just like tables in sql
	// one database may have many collections/tables
	const collection = db.collection('documents');
	// NOSQL - Not Only SQL/Structure Query Language 
	
	// Clears that collection, removes all documents
	await collection.deleteMany( { } );
		
	const result = await collection.insertMany( [ 
		{ name: "Bob", occupation: "Programmer" },
		{ name: "George", occupation: "Cool dude" },
		{ name: "Wily", occupation: "Cool dude" },
		{ name: "Thomas", occupation: "Cool dude" },
		{ name: "Rock", occupation: "Cool dude" },
		{ name: "Roll", occupation: "Cool dude" },
		{ name: "Bass", occupation: "Cool dude" },
		{ name: "Treble", occupation: "Cool dude" },
		{ name: "X", occupation: "Cool dude" },
		{ name: "Zero", occupation: "Cool dude" },
	] );
	console.log(result);
	
	for (let thing of result.ops) {
		if (Math.random() < .5) {
			console.log(`Deleting ${thing._id}`);
			await collection.deleteOne({ _id: thing._id});
		} else {
			
		}
	}
		
	
	client.close();
});
