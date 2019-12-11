// JS has objects too 

// Call Date constructor, then getTime method of the Date instance
var start = new Date().getTime();

// This is a constructor definition
function Foobar() {
	this.x = 10;
	this.y = 20;
	this.name = "bob";
	this.greeting = function() {
		console.log("Hello I am " + this.name)
	}
}

// And this is using the constructor written above:
var foo = new Foobar();
foo.greeting();
console.log("("+foo.x + ", " + foo.y+ ")")
