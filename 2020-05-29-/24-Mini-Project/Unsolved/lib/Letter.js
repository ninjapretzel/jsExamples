
class Letter {
	constructor (char) {
		this.visible = (char.toUpperCase() < "A" || char.toUpperCase() > "Z");
		
		this.char = char
	}
	
	toString() {
		if(this.visible) {
			return this.char
		} else {
			return "_"
		}
	}
	
	guess(userGuess) {
		if(userGuess.toUpperCase() === this.char.toUpperCase()) {
			this.visible = true
			return true
		} else {
			return false
		}
		
	}
	
	getSolution() {
		return this.char;
	}
	
}
module.exports = Letter;