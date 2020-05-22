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
			name: "projectName",
			message: "What is the project name?",
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
	
	
	let text = `# ${data.projectName}

## Description

${data.desc}

## Table of Contents

* [Installation](#installation)

* [Usage](#usage)

* [License](#license)

* [Contributing](#contributing)

* [Tests](#tests)

* [Questions](#questions)

## Installation

To install necessary dependencies run the following command:

\`\`\`
${data.dependencies}
\`\`\`

## Usage

${data.infoUse}

## License



## Contributing

${data.infoContriubte}

## Tests

To run tests, run the following command:

\`\`\`
${data.tests}
\`\`\`

## Questions

If you have any questions about the repository, 
open an issue or contact [${data.username}](undefined) directly at ${data.email}.

`;
	
	await fs.writeFile("README.md", text);
	
	console.log("Wrote file README.md!");
	
}

// Finally, we call the async method to actually kick off the program.
main();
