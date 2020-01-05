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

step();
while (isNearBeeper()) {

	doubleBeepers()	step();
}