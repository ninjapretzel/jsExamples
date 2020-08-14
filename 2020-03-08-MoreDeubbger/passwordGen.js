// I'd rather use strings than arrays
// strings act like character arrays already
const specialCharacters = "!@#$%^&*()`~-=_+[]\\{};:\'\"<>?,./";
const numericCharacters = "1234567890";
const lowercaseCharacters = "abcdefghijklmnopqrstuvwxyz";
const uppercaseCharacters = lowercaseCharacters.toUpperCase();

/** Picks a random item from the given array or string */
function pick(s) {
	// Can also index a string with [] (as if it was an array)
	// so this will work for either strings or arrays...
	return s[Math.floor(Math.random() * s.length)];	
}

/** Generates a password from the options selected on the page */
function generatePassword() {
	let password = "";
	
	const special = $("#special").is(":checked")
	const numeric = $("#numeric").is(":checked")
	const lower = $("#lower").is(":checked")
	const upper = $("#upper").is(":checked")
	let length = $("#length").val();
	if (isNaN(parseInt(length))) {
		length = 12;
	}
	
	let chars = "";
	if (special) { 
		chars += specialCharacters; 
		password += pick(specialCharacters); 
	}
	if (numeric) { 
		chars += numericCharacters;
		password += pick(numericCharacters); 
	}
	if (lower) { 
		chars += lowercaseCharacters; 
		password += pick(lowercaseCharacters); 
	}
	if (upper) { 
		chars += uppercaseCharacters; 
		password += pick(uppercaseCharacters); 
	}
	if (chars.length === 0) {
		M.toast({html:"At least one character type must be selected", classes:"red"});
		return "";	
	}
	
	while (password.length < length) {
		password += pick(chars)	
	}
	return password;
}

/** Brandon's password generation method */
function brandonPassword() {
	let password = "";
	
	// "Pick a phrase" and take the first letter of each word
	// Capitalize the first letter and leave the others lowercase
	password += pick(uppercaseCharacters);	
	let phraseLength = 6 + Math.floor(Math.random() * 10);
	for (let i = 0; i < phraseLength; i++) {
		password += pick(lowercaseCharacters);	
	}
	// Add a dash for a special character
	password += "-"
	// Add some numbers on the end
	let numbers = 6 + Math.floor(Math.random() * 10);
	for (let i = 0; i < numbers; i++) {
		password += pick(numericCharacters);	
	}
	return password;
}


// add stuff to happen when the button is clicked 
$("#generate").click(function(){
	
	console.log(generatePassword());
	console.log(brandonPassword());
	
	$("#password").val(brandonPassword());
})