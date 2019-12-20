const calc = {
	value: 0,
	equation: [],
	justCalcd: false,
};

function crunch(equation) {
	let val = equation[0];
	
	for (let i = 1; i < equation.length; i+=2) {
		const op = equation[i];
		const num = Number(equation[i+1]);
		
		if (num !== NaN) {
			if (op === "+") {
				val += num;
			}
			if (op === "-") {
				val -= num;
			}
			if (op === "*") {
				val *= num;
			}
			if (op === "/") {
				val /= num;
			}
		}
		
	}
	return val;	
}
// Test cases 
console.log( crunch( [ 35, "+", 20 ] ) ) // 55 
console.log( crunch( [ 1, "+", 2, "+", 3, "+", 4 ] ) ) // 10 
console.log( crunch( [ 10, "*", 2, "*", 3, "/", 4, "-",  5] ) ) // 10

function render() {
	$("#result").text(calc.value);
	$("#working").text(calc.equation.join(" ") || "---");
}
function addDigit(digit) {
	if (calc.justCalcd) {
		calc.value = Number(digit);		
		
	} else {
		calc.value += digit;
		calc.value = Number(calc.value);
	}
	calc.justCalcd = false;
	render();
}
function addOp(op) {
	calc.equation.push(calc.value);	
	calc.equation.push(op);
	calc.value = 0;
	calc.justCalcd = false;
	render();
}

$(document).ready(function() {
	$("#C").click(function() { 
		calc.value = 0;
		calc.equation = [];
		calc.justCalcd = false;
		render();
	})
	$("#CE").click(function() {
		calc.value = 0;
		calc.justCalcd = false;
		render();	
	})
	$("#1").click(function() { addDigit("1"); })
	$("#2").click(function() { addDigit("2"); })
	$("#3").click(function() { addDigit("3"); })
	$("#4").click(function() { addDigit("4"); })
	$("#5").click(function() { addDigit("5"); })
	$("#6").click(function() { addDigit("6"); })
	$("#7").click(function() { addDigit("7"); })
	$("#8").click(function() { addDigit("8"); })
	$("#9").click(function() { addDigit("9"); })
	$("#0").click(function() { addDigit("0"); })
	$("#DIV").click(function() { addOp("/"); })
	$("#MUL").click(function() { addOp("*"); })
	$("#ADD").click(function() { addOp("+"); })
	$("#SUB").click(function() { addOp("-"); })
	$("#DOT").click(function() {
		if (calc.justCalcd) {
			calc.value = "0."
		} else {
			calc.value += ".";
		}
		calc.justCalcd = false;	
		render();
	})
	$("#NEG").click(function() {
		calc.value *= -1;
		render();	
	})
	
	$("#EQ").click(function() { 
		calc.equation.push(calc.value);
		calc.value = crunch(calc.equation);
		calc.equation = []
		calc.justCalcd = true;
		render();
	})
	
	$("#BACK").click(function() {
		if (Number(calc.value) === 0) { 
			if (calc.equation.length > 0) {
				calc.equation.pop(); // discard operator
				calc.value = calc.equation.pop();
			}
		} else {
			console.log("hi");
			calc.value = "" + calc.value;
			calc.value = calc.value.substring(0, calc.value.length-1);
			if (calc.value === "") {
				calc.value = 0;
			}
		}
		render();
	})
})