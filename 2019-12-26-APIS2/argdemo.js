// Javascript functions take args in.
// They may be declared to take any number of arguments 
// You have complete control over the names of arguments, and can make the names be whatever you want.
function test(arg0, arg1, arg2, arg3) {
	// So long as you use the names within the function body.
	console.log(arg0 + " " + arg1 + " " + arg2 + " " + arg3 + " ")
}

// Functions that take no arguments are also possible
function test2() {
	console.log("hi");
}

// There are also ways to query what arguments were passed,
// even if you don't explicitly take any arguments.
function test3() {
	console.log("You passed me " + arguments.length + " args!")
}

// For example, I can write a function that takes any number of arguments,
// and finds the lowest given value
function min() {
	let lowest = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		if (arguments[i] < lowest) {
			lowest = arguments[i];	
		}
	}
	return lowest;
}
// When functions are called, whatever is between the ()'s gets passed into the function.
// If nothing is present, the special value 'undefined' is passed instead.
// This prints `undefined undefined undefined undefined`.
test();
// This prints `1 2 3 4`
test(1, 2, 3, 4);
// This prints `ayy lmao undefined undefined`
test("ayy", "lmao");

// We can call a method that only takes one parameter with many.
// They all just get ignored. (since nothing in the code uses them!)
// This just prints 'hi'
test2(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
// as does this
test2();

// This function prints the number of arguments passed into it
// This prints 'You passed me 20 args!'
test3(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
// This prints 'You passed me 5 args!'
test3("hello", " ", "amazing", " ", "world");

console.log(
	// This function finds the minimum value given to it, 
	// this one finds the 5 and returns it, which gets passed to `console.log` and printed.
	min(50, 20, 30, 10, 80, 5, 200, 111)
)
	
console.log(
	// this one finds the 111 and returns it, which gets passed to `console.log` and printed.
	min(111, 122, 133)
)