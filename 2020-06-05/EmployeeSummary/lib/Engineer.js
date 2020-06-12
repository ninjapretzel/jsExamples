// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")

// Engineer is a new type, inherits all things from Employee.
class Engineer extends Employee {
	// Provide new constructor with 4 parameters
	constructor (name, id, email, github, lang){
		// Call the super/parent class constructor 
		super(name, id, email);
		this.github = github;
		this.lang = lang;
	}
	getGithub() {
		return this.github;
	}
	getRole() {
		return "Engineer";
	}// Overridden to return 'Engineer'
}
module.exports = Engineer
