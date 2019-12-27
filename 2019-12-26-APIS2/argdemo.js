function test(arg0, arg1, arg2, arg3) {
	console.log(arg0 + " " + arg1 + " " + arg2 + " " + arg3 + " ")
}

function test2() {
	console.log("hi");
}

function test3() {
	console.log("You passed me " + arguments.length + " args!")
}

function min() {
	let lowest = arguments[0];
	for (let i = 1; i < arguments.length; i++) {
		if (arguments[i] < lowest) {
			lowest = arguments[i];	
		}
	}
	return lowest;
}

test();
test(1, 2, 3, 4);
test("ayy", "lmao");

test2(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);

test3(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20);
console.log(
	min(50, 20, 30, 10, 80, 5, 200, 111)
)