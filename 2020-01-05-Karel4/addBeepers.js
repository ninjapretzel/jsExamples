function turnRight() { turnLeft(); turnLeft(); turnLeft(); }
function turnAround() { turnLeft(); turnLeft(); }

function backUp() {
	turnAround();
	step();
	turnAround();
}

function doubleBeepers() {
	while (isNearBeeper()) {
		takeBeeper();
		step();
		placeBeeper();
		backUp();
	}
	step();

	while (isNearBeeper()) {
		takeBeeper();
		backUp();
		placeBeeper();
		placeBeeper();
		step();
	}

}

function addBeepers() {
	while(isNearBeeper()) {
		step();
	}
	turnAround();
	step();
	while(isNearBeeper()) {
		while(isNearBeeper()) {
			takeBeeper();
		}
		step();
	}
	while(hasBeeper()) {
		placeBeeper();
	}
	turnAround();
	step();
}

step();
while(isNearBeeper()) {
	turnLeft();
	addBeepers();
	turnRight();
	step();
}
turnAround();
step();
turnLeft();
step();
turnRight();
addBeepers();


