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
			name:"username",
			message:"What is your github username?",
		},
		{
			type: "input",
			name: "email",
			message: "What is your email address?",
		}, 
		{
			type: "input",
			name: "url",
			message: "What is the URL to the project?",
		},
		{
			type: "input",
			name: "desc",
			message: "What is the project description?",
		},
		{
			type: "list",
			message: "What is your project's license?",
			name: "licence",
			choices: [ "MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "NONE" ],
		},
		{
			type: "input",
			name: "dependencies",
			message: "What is the command to install depenedencies?",
		},
		{
			type: "input",
			name: "tests",
			message: "What is the command to run tests?",
		},
		{
			type: "input",
			name: "infoUse",
			message: "What does the user need to know to use this program?",
		},
		{
			type: "input",
			name: "infoContriubte",
			message: "What does the user need to know to contribute to this project?",
		},
	])
	
	// // Preview data the user entered if desired
	// // console.log(data);
	// // Derive filename to write to 
	// const filename = data.name.toLowerCase().replace("\s", "") + ".json";
	
	// // Try to do some code that may have a problem
	// try {
	// 	// Wait for the file to be finished writing
	// 	result = await fs.writeFile(filename, JSON.stringify(data, null, "\t"));
	// 	// If there was a failure on the line above,
	// 	// all lines below will be skipped
	// 	console.log("Success!");
	// } catch (err) {
	// 	// If anything goes wrong, we get some data about what went wrong (`err`)
	// 	// and control jumps into this `catch` block
	// 	// and the error is considered handled when the block exits
	// 	console.log("Could not write file " + filename);
	// 	console.log(err);	
	// }
}

// Finally, we call the async method to actually kick off the program.
main();
