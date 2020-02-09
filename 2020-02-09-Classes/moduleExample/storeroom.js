let numSandwiches = 7;

function takeSandwich() { 
	if (numSandwiches > 0) {
		numSandwiches--;
		return "got a sandwich";	
	}
	return "no sandwiches";
}

module.exports = {
	takeSandwich	
}


