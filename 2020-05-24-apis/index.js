const fs = require(`fs-promise-native`);
const axios = require("axios");

async function main() {
	
	let response = await axios.get("https://icanhazdadjoke.com/", {
		headers: { accept: "application/json" }
	});
	
	await fs.appendFile("jokes.txt", response.data.joke + "\n\n");
	
	let jokes = await fs.readFile("jokes.txt");
	
	console.log(jokes.toString());
	
}

main();
