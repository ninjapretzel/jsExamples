// This variable is only visible in 'myModule'.
let localThing = 5;

const exp = {
	exportedThing: 20,
	exportedFunc: function() {
		let exportedThing = exp.exportedThing;
		localThing++;
		
		console.log(`LocalThing: ${localThing}`);
		console.log(`ExportedThing : ${exportedThing}`);
	}
};

module.exports = exp;