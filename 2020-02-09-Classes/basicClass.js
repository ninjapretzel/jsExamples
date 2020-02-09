// There is always a 'this' object
console.log(this);
this.x = 5;
console.log(this);

// A class can be defined as a function
// that uses the 'this' keyword, and is called with the 'new' keyword
function Person(name, age, address) {
	this.name = name;
	this.age = age;
	this.address = address;
}

// Construct a few people
let bob = new Person("Bob", 25, "12345 Downy lane");
let george = new Person("george", 24);
let dracula = new Person("Dracula", 350, "Translyvania");
let kirk = new Person("James T Kirk", 2020-2233, "Space");
console.log(bob);


console.log(bob.__proto__);

// || is the logical 'or' operator.
// It can also be used to provide a default value 
function printPerson(person) {
	console.log(`${person.name} lives in ${person.address || "nowhere"}`);
}
printPerson(bob);
printPerson(george);
printPerson(dracula);
printPerson(kirk);

// && is the logical 'and' operator
// There are no real special uses for and,

function checkAge(person) {
	if (person.age > 18 && person.age < 80) {
		console.log(`${person.name} is able to drink!`);
	}
	if (person.age < 0 || person.age > 120) { 
		console.log(`I don't believe ${person.name} is human.`);	
	}
	
}


checkAge(bob);
checkAge(george);
checkAge(dracula);
checkAge(kirk);

