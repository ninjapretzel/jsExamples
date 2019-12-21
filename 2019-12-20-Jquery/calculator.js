// Simple calculator program.
// This is a fairly functional calculator application.
// It's not perfect, but it does work pretty well. 

// This is the object representing the state of our calculator.
const calc = {
	// Current value (to be displayed)
	value: 0,
	// Current equation punched in by the user.
	equation: [],
	// Did the user _just_ hit the `=` Button? 
	justCalcd: false,
};

// This is the logic that calculates the equation the user punched in
// this will ignore order of operations (PEMDAS), but that's fine for a basic calculator app.
function crunch(equation) {
	// Grab the first element, and turn it into a number (just in case it's a string, eg "12." if the user just hit `.`)
	let val = equation[0];
	
	// Loop over the rest of the equation array, consuming 2 elements at a time
	// (starting at 1, adding two each time )
	for (let i = 1; i < equation.length; i+=2) {
		// The next item is the operator to use
		const op = equation[i];
		// The item after that is the number to perform the operation with 
		const num = Number(equation[i+1]);
		
		// So long as it's actually a number...
		if (num !== NaN) {
			// Perform the requested operation
			if (op === "+") { val += num; }
			if (op === "-") { val -= num; }
			if (op === "*") { val *= num; }
			if (op === "/") { val /= num; }
		}
		
	}
	// When we're out of equation to do math with, return the value we have. 
	return val;	
}

// Some test cases  
console.log( crunch( [ 35, "+", 20 ] ) ) // 35+20 = 55 
console.log( crunch( [ 1, "+", 2, "+", 3, "+", 4 ] ) ) // 1+2+3+4 = 3+3+4 = 6+4 = 10 
console.log( crunch( [ 10, "*", 2, "*", 3, "/", 4, "-",  5] ) ) // 10*2*3/4-5 = 20*3/4-5 = 60/4-5 = 15-5 = 10

// Renders the current state of the `calc` object into the page 
function render() {
	$("#result").text(calc.value);
	$("#working").text(calc.equation.join(" ") || "---");
}
// Modify the state of the calculator by adding a digit on the right. 
// Digit will be the number to add as a string, for example, "0", through "9"
// Used when the user clicks one of the 0123456789 buttons
function addDigit(digit) {
	if (calc.justCalcd) {
		// If the user just hit equals, instead, override the value with what they punched in.
		calc.value = Number(digit);
	} else {
		// Normally, add the digit on the right side of the value (as a string) 
		calc.value += digit;
		// And try to conver the value back into a number. 
		calc.value = Number(calc.value);
	}
	// Set the state so that the user didn't just hit equals
	calc.justCalcd = false;
	// And update the displays. 
	render();
}
// Modify the state of the calculator by applying the given operator, eg "+", "-", "/", or "*"
// Used when the user clicks one of the -=/* buttons
function addOp(op) {
	// Push (insert) the current value into the equation (on the 'right' end)
	calc.equation.push(calc.value);	
	// Push (insert) the desired operator  into the equation (on the 'right' end)
	calc.equation.push(op);
	// Reset the value to 0
	calc.value = 0;
	// Set the state so that the user didn't just hit equals
	calc.justCalcd = false;
	// And update the displays. 
	render();
}

// When the page is ready...
$(document).ready(function() {
	// We'll bind our click callbacks to all of our buttons.
	
	// Bind a callback to the `C`/'Clear' button
	$("#C").click(function() { 
		// Reset value to zero
		calc.value = 0;
		// Reset equation to empty
		calc.equation = [];
		// Set state so that the user didn't hit equals. 
		calc.justCalcd = false;
		// And update the display 
		render();
	})
	// Bind a callback to the `CE`/'Cancel Entry' button
	$("#CE").click(function() {
		// Reset just the value to zero, 
		calc.value = 0;
		// Set state so that the user didn't hit equals. 
		calc.justCalcd = false;
		// and update the display.  
		render();	
	})
	// All of our digit buttons... Set each of these to add the digit that was pressed into the value entry 
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
	
	// All of our operator buttons... Apply the clicked operator, and reset the value entry. 
	$("#DIV").click(function() { addOp("/"); })
	$("#MUL").click(function() { addOp("*"); })
	$("#ADD").click(function() { addOp("+"); })
	$("#SUB").click(function() { addOp("-"); })
	
	// Misc functions... Add a decimal point, (and convert value to a string )
	$("#DOT").click(function() {
		if (calc.justCalcd) {
			// If the user just hit equals, start the decimal after a zeto
			calc.value = "0."
		} else {
			// Otherwise, put the decimal on the right of their current entry, and turn it into a string.
			calc.value += ".";
		}
		// Set state so that the user didn't just hit equals... 
		calc.justCalcd = false;	
		// And update the displays 
		render();
	})
	// Negate the value by changing its sign
	$("#NEG").click(function() {
		// Flip value's sign
		calc.value *= -1;
		// And update the displays
		render();	
	})
	
	// Clicking Equals.
	$("#EQ").click(function() { 
		// Put the value into the equation
		calc.equation.push(calc.value);
		// Crunch the equation, and set the current value to the result
		calc.value = crunch(calc.equation);
		// Reset the equation to empty array 
		calc.equation = []
		// And, for this one, we did in fact, just hit equals
		// so set the state to reflect that we have just hit equals. 
		calc.justCalcd = true;
		// and finally, update the display.
		render();
	})
	
	// Clicking backspace
	$("#BACK").click(function() {
		// If we have a zero number, (and it doesn't end in a `.` as a string )
		if (Number(calc.value) === 0 && String(calc.value).slice(-1) !== '.') { 
			// If we have some stuff in our equation...
			if (calc.equation.length > 0) {
				/// Remove and discard the hanging operator
				calc.equation.pop(); 
				// and update our value to the number preceding the operator.
				calc.value = calc.equation.pop();
			}
			
			// Otherwise (non zero number or with a `.` at the end )
		} else {
			// Convert the value to a string
			calc.value = String(calc.value);
			// Remove the last character from the string
			calc.value = calc.value.substring(0, calc.value.length-1);
			// If we have an empty result string, set the value to zero.
			if (calc.value === "") { 
				calc.value = 0; 
			}
		}
		// And finally, render the current calc object onto the page.
		render();
	})
	
	// Done registering callbacks.
})