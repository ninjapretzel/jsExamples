const Letter = require("./Letter.js")

class Word {
	constructor(word) {
		this.letters = word.split("").map(function(char){
			return new Letter(char)
		})
	}
	
	guessLetter(char) {
		let foundLetter = false
		this.letters.forEach(letter => {
			if (letter.guess(char)){
				foundLetter = true
			}
		});
		// console.log("/n" + this + "/n") 
		return foundLetter
	}
	
	guessedCorrectly() {
		// Find letters that are not visible (hidden)
		// Note from tutor: I typically use the name 'it' for the parameter into predicates and iterators
		let hiddenLetters = this.letters.filter(letter => !letter.visible);
		
		// No more hidden letters, then it is guessed correctly.
		return hiddenLetters.length == 0;
	}
}

module.exports = Word