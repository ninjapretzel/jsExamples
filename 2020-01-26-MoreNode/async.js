/** Promise wrapper to run code after a delay */
function wait(ms) {
	return new Promise((resolve, reject) => { setTimeout( ()=>{resolve(); }, ms); });
}
/** directly async version of 'wait' */
async function pause(ms) { 
	await wait(ms); 
}

async function tickThreeTimes() {
	await wait(1000);
	console.log("tick");	
	await wait(1000);
	console.log("tick");	
	await wait(1000);
	console.log("tick");	
}
async function ticknTimes(n) {
	for (let i = 0; i < n; i++) {
		await wait(1000);
		console.log("tick");	
	}
}


//tickThreeTimes();
ticknTimes(10);

// UGLY VERSION:
// setTimeout(function() {
// 	console.log("tick");
// 	setTimeout(function() {
// 		console.log("tick");
// 		setTimeout(function() {
// 			console.log("tick");
// 		}, 1000)
// 	}, 1000)
// }, 1000)


