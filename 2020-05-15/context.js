
// Version 1 - function() {} forgets the 'this'
var person1 = {
	name: "Hodor1",
	saySomething: function() {
		console.log(this.name + " is thinking...");
		setTimeout(function() {
			// 'this' changes by the time this function actually gets called!
			// it will print `undefined!`
			console.log(this.name + "!");
		}, 50);
	}
};

// Version 2 - ()=>{} implictly captures the 'this'
var person2 = {
	name: "Hodor2",
	saySomething: function() {
		console.log(this.name + " is thinking...");
		setTimeout( () => {
			// lambda notation implicitly captures the 'this' object
			// at the time of its creation, so 'this' is not lost
			console.log(this.name + "!"); 
		}, 100);
	}
};

// Version 3 - function() {} with an explicit `this` capture
var person3 = {
	name: "Hodor3",
	saySomething: function() {
		console.log(this.name + " is thinking...");
		// Hack! Captures the 'this' context object!
		const self = this;
		setTimeout(function() {
			// Even though 'this' changes by the time this function runs
			// we've captured it into 'self', so we don't lose it
			console.log(self.name + "!");
		}, 150);
	}
};

// Version 4 - function() {} with an explict `bind(this)`
var person4 = {
	name: "Hodor4",
	saySomething: function() {
		console.log(this.name + " is thinking...");
		setTimeout(function() {
			console.log(this.name + "!");
		}.bind(this), 200); // We can bind the anonymous function to 'this',
		// so it will resume in the same context it is originally run in.
		// bind does not change the original function-
		// it creates a new function that sets the context 'this' object before it runs
	}
};

// Kick off all 4 saySomethings
person1.saySomething();
person2.saySomething();
person3.saySomething();
person4.saySomething();