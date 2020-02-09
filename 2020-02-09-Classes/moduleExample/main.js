let x = "millions";

const theModule = require("./module.js");
const storeroom = require("./storeroom.js");


console.log(`Hi from main, x is ${x}`);
console.log("theModule is: ");
console.log(theModule);
console.log("calling theModule.doThing");
theModule.doThing()
console.log(`this is:`);
console.log(this);


let numSandwiches = 5;
while (numSandwiches > 0) {
	console.log("Sold a sandwich!");
	numSandwiches--;	
}

console.log("out of sandwiches!");
console.log("restocking sandwiches!");

for (let i = 0; i < 10; i++) {
	if (storeroom.takeSandwich() == "got a sandwich") {
		numSandwiches++;	
	}
}

console.log(`I have ${numSandwiches} sandwiches!`);
