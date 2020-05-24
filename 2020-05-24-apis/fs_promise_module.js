const fs_native = require("fs");
const axios = require("axios");


const fs_async = {
	readFile: function(path, options) {
		// Create a new promise from a callback
		// This callback gets two functions,
		// typically called "resolve" and "reject"
		// calling resolve will complete the promise, and 
		// the first parameter will be used as the completed
		// value of that promise. (passed into its "then" method)
		// calling reject will make the promise fail,
		// making that promise trigger its "catch" method
		return new Promise(function(resolve, reject) {
			// Call the native method we want,
			// and pass in our own callback to handle the result
			fs_native.readFile(path, options, function(err, data) {
				// If there is an error (non-null error)
				if (err) { 
					// Fail the promise
					reject(err);
					// avoid calling both resolve and reject
					return; 
				}
				// otherwise if no error, complete successfully
				resolve(data);
			});
		});
	},
	appendFile: function(path, text, options) {
		return new Promise(function (resolve,reject) {
			fs_native.appendFile(path, text, options, function(err) {
				if (err) {
					reject(err);
					return;	
				}
				// This time, just complete the promise
				// no value will be passed into the `.then` method
				// and no value will be yielded by `await`ing the Promise
				resolve();
			});
		});
	}
}

// JavaScript runs on REALLY FAST COMPUTERS, so
// imagine "The Flash" running a office....
// (He's like the CPU, running this code)
async function main() {
	//// Promises work well for single operations
	//// done in sequence  Await entire request
	// "The Flash" Mails another superhero for a dad joke
	// Might take a few days, but "The Flash" knows 
	// what to do when it comes back
	let response = await axios.get("https://icanhazdadjoke.com/", {
		headers: { accept: "application/json" }
	});
	// Once "The Flash" recieves the letter, he calls another
	// superhero in his office, and tells him 
	// "Go downstairs, and add this joke to the list of jokes"
	// " in filing cabinet 20 "
	
	// Other superhero goes downstairs, adds the joke to the list,
	// and then walks back upstairs, all while "The Flash" is still 
	// able to do all sorts of other things.
	
	//// Await adding joke to file
	await fs_async.appendFile("jokes.txt", response.data.joke + "\n\n");
	// Once that guy comes back, "The Flash" can continue this process...
	// He then asks the guy to go back down the stairs, 
	// read the entire list of jokes, 
	// and then tell them to him one by one...
	// (IRL, the analogy breaks down, right? 
	// He could have told the guy 
	// to look the file up while down there);
	
	//// Await reading entire jokes file
	let jokes = await fs_async.readFile("jokes.txt");
	
	// Guy comes back up, tells "The Flash" all the jokes...
	console.log(jokes.toString());
}

// without async/await keywords version, 
// painful to write, hard to follow
// still uses promises (`.then` methods)
function syncMain() {
	axios.get("https://icanhazdadjoke.com/", {
		headers: { accept: "application/json" }
	}).then(function(response) {
		fs_async.appendFile("jokes.txt", response.data.joke + "\n\n")
		.then(function() {
			fs_async.readFile("jokes.txt").then(function(jokes) {
				console.log(jokes.toString());
			});
		});
	});
}
	

// Repeated operation, still use a callback!
// (repeats calling the main method)
setInterval(main, 2000);
// or for events (clicks, key

