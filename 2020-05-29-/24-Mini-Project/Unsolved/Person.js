
function Person(first, last) {
	this.first = first;
	this.last = last;
	// 
	// this.greet = function() {
	// 	console.log(`Hello, my name is ${this.first} ${this.last}`);
	// }
}

Person.prototype.greet = function() {
	console.log(`Hello, my name is ${this.first} ${this.last}`);
}


var pete = new Person("pete", "smith");

var obj = {};

console.log(pete);
console.log(obj);

pete.greet();


console.log(Person.prototype);

var now = new Date(1590784129722)
console.log(`Unix Timestamp: ${now.getTime()}`);
console.log(`Time String: ${now.toTimeString()}`);
