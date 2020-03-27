


// if (<condition>) { 
//		<statements to run if true> 
//} (else { 
//		<statments to run if false> 
//}?)

// comparisons:
// a > b	- greater than. true if a is greater than b
// a >= b	- greater than or equal to. true if a is greater than or equal to b
// a < b	- less than. true if a is less than b
// a <= b	- less than or equal to. true if a is less than or equal to b
// a === b	- equal to. true if a is equal to b.
// a !== b	- not equal to. true if a is not equal to b

// Logical operators:
// a && b	- logical AND, true if both a and b are true, false otherwise
// a || b	- logical OR, true if either a or b is true, or if both are true, false if both are false.

// Not operator:
//	!a		- inverts the value of a (false becomes true, true becomes false)


// javascript weirdness...
// "5" == 5 is true
// use ===, is the 'strict' equals
// "5" === 5 is false.
// strings behave differently
// "5" + 5 = "55"
// 5 + 5 = 10

var x = -15;
debugger;

if (x > 5) { // is x greater than 5?
	// If true, do this
	console.log("x is greater than 5");
} else {
	console.log("x is (NOT) greater than 5");
}


// if (x > 10 && x < 20) {
// 	console.log("x is between 10 and 20");
// }

if (!(x > 10 && x < 20)) {
	console.log("x is (NOT) between 10 and 20");
}