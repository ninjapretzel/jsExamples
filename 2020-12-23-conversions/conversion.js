
function toBinary(number) {
	let result = "";
	
	while (number > 0) {
		const remainder = number % 2;
		result = remainder + result;
		number = Math.floor(number/2);
	}
	
	return result;
}
//"1010010111101001"
//[ "1", "0", "1", "0", ... ]
function fromBinary(val) {
	let placeValue = 1;
	let result = 0;
	// for (initializer;condition;increment) { body }
	for (let i = 0; i < val.length; i++) {
		const bit = val[val.length - 1 - i]
		
		if (bit === "1") {
			result += placeValue;
		}
		
		placeValue *= 2;
	}
	return result;
}


console.log("Our conversions:");
console.log(toBinary(42473))
console.log(fromBinary("1010010111101001"))

console.log("Javascript built-in conversions:");
x = 42473
console.log(x.toString(2)); // Convert to binary
console.log(parseInt("1010010111101001", 2));

console.log(x.toString(6)); // Convert to binary
