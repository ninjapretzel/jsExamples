function turnRight() { turnLeft();turnLeft();turnLeft(); }
function turnAround() { turnLeft(); turnLeft(); }


function climbPlaceAndDecend() {
	if (isBlocked()) {
		turnLeft();
		step();
		turnRight();
		step();
		climbPlaceAndDecend();
		step();
		turnRight();
		step();
		turnLeft();
	} else {
		placeBeeper();
	}
}
