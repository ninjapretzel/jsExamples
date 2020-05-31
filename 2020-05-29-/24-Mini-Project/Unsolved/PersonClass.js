



class Person {
	constructor(first, last) {
		this.first = first;
		this.last = last;
		this.fullName = first + " " + last;
	}
	
	greet() {
		console.log(`Hello, my name is ${this.fullName}`);
	}
}

var pete = new Person("pete", "smith");

var obj = {};

console.log(pete);
console.log(obj);

pete.greet();


console.log(Person.prototype);
