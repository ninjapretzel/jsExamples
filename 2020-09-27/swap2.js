debugger;
let a = 3; 
let b = 5;

{// #1 array destructure 
	[ a, b ] = [ b, a ];
	// Actually does the following:
	//let temp = [ b, a ];
	//a = temp[0];
	//b = temp[1];
}

{// #2
	let temp = a;
	a = b;
	b = temp;
}

{ // #3 Math - ONLY WORKS WITH NUMBERS!
	a = a + b;
	b = a - b;
	a = a - b;
}


{ // #4 - Exclusive OR - ONLY WORKS WITH NUMBERS!
	a = a ^ b; 
	b = a ^ b;
	a = a ^ b;
}
// 0b1000
// 0b11100110
// 2+4+32+64+128

// 3 = 0b0011
// 5 = 0b0101
// ^ - EXCLUSIVE OR
// 6 = 0b0110

// LOGICAL AND		LOGICAL OR		EXCLUSIVE OR
// T & T = T		T | T = T		T ^ T = F
// T & F = F		T | F = T		T ^ F = T
// F & T = F		F | T = T		F ^ T = T
// F & F = F		F | F = F		F ^ F = F
