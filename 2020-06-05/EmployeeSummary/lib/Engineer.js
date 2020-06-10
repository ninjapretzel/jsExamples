// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require("./Employee")

// Engineer is a new type, inherits all things from Employee.
class Engineer extends Employee {
	// Provide new constructor with 4 parameters
	constructor (name, id, email, github){
		// Call the super/parent class constructor 
		super(name, id, email);
		
		console.log(this);
		this.github = github;
		console.log(this);
	}
	getGithub() {
		return this.github;
	}
	getRole() {
		return "Engineer";
	}// Overridden to return 'Engineer'
}

console.log(new Engineer("Bob", "123", "bob@bob.bob", "bobberton"));
module.exports = Engineer
