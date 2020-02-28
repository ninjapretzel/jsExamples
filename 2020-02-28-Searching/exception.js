
function parse(str) {
	let num = Number(str);
	if (num) {
		return num;
	}
	throw new Error("Parse error, " + str + " is not a number");	
}

function a() {
	return b();	
}
function b() {
	return c();
}
function c() { 
	return parse("twenty");
}

try {
	let x = a();
	console.log("a() successful, " + x);
	
} catch (err) {
	console.log(err);
}

console.log("Exiting successfully");