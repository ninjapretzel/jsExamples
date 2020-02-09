
// Classes can also be defined with the 'class' keyword
class Person {
	constructor(name, age, address) {
		console.log(this);
		this.name = name;
		this.age = age;
		this.address = address;	
		console.log(this);
	}
}

let bob = new Person("Bob", 25, "12345 Downy lane");
let nonPersonBob = { 
	name: "Bob",
	age: 25,
	address: "12345 Downy lane"
}

console.log(bob);
console.log(nonPersonBob);


console.log(bob.age);

console.log(bob.__proto__);
console.log(nonPersonBob.__proto__);