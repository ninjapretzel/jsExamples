const inquirer = require('inquirer');
const fs = require('fs-promise-native');

/// Need to wrap code in an async function in order to use 'await'
async function main() {
	// inquirer.prompt returns a `Promise<>`
	// we can use `await` to wait for the promise,
	// which is equivelant to passing the code below
	// into the `Promise<>`'s `then()` method
	let data = await inquirer.prompt([
		{
			type:"input",
			name:"name",
			message:"What is your name?"
		},
		{
			type: "checkbox",
			message: "What languages do you know?",
			name: "stack",
			choices: [ "HTML", "CSS", "JavaScript", "MySQL" ],
		}, 
		{
			type: "list",
			message: "What is your preferred method of communication?",
			name: "contact",
			choices: [ "email", "phone", "texts", "telepathy", "discord", "slack" ],
		}
	])
	
	// Preview data the user entered if desired
	// console.log(data);
	// Derive filename to write to 
	const filename = data.name.toLowerCase().replace("\s", "") + ".json";
	
	// Try to do some code that may have a problem
	try {
		// Wait for the file to be finished writing
		result = await fs.writeFile(filename, JSON.stringify(data, null, "\t"));
		// If there was a failure on the line above,
		// all lines below will be skipped
		console.log("Success!");
	} catch (err) {
		// If anything goes wrong, we get some data about what went wrong (`err`)
		// and control jumps into this `catch` block
		// and the error is considered handled when the block exits
		console.log("Could not write file " + filename);
		console.log(err);	
	}
}

// Finally, we call the async method to actually kick off the program.
main();
