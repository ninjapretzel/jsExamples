class Employee {
	constructor(name, id, email) {
		console.log(this);
		this.name = name;
		console.log(this);
		this.id = id;
		console.log(this);
		this.email = email;
		console.log(this);
	}
	getName() {
		return this.name;
	}
	getId() {
		return this.id;
	}
	getEmail() {
		return this.email;
	}
	getRole() {
		return "Employee"
	}
}

module.exports = Employee
