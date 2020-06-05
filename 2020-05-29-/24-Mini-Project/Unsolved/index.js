const words = Object.keys(require("./words_dictionary.json"));
const inquirer = require("inquirer");
const Word = require("./lib/Word");

function randomWord() {
	let num = Math.floor( Math.random() * words.length );
	return words[num];
}



async function main() {
	while (true) {
		const word = new Word(randomWord());
		let guessed = "";
		
		while (!word.guessedCorrectly()) {
			
			console.log(word.toString());
			
			let data = await inquirer.prompt([
				{
					type:"input",
					name:"guess",
					message:"Enter your guess:",
				},
			]);
			
			if (data.guess.length === 0) {
				continue; 
			}
			
			const guessChar = data.guess[0];
			if (guessed.includes(guessChar)) {
				
			}
			
			let found = word.guessLetter();
			
			if (found) {
				console.log("You got one of em!");	
			}
			
		}
		
		console.log(`You got it! the word was ${word.toString()}!`);
		
	}
	
}
main();

