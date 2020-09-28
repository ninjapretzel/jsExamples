debugger;
let a = 3; // water
let b = 5; // sand

function swap() {
	// get a third bucket
	// fill third bucket with sand
	let temp = b;
	// both b and c have sand in them.

	// empty b, put water in it
	b = a; 
	// both a and b have water in them

	// empty a, put sand in it
	a = temp;
	
}// throw the third bucket away

console.log("a is " + a + " b is " + b);

swap();

console.log("a is " + a + " b is " + b);
