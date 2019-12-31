function turnRight() { turnLeft();turnLeft();turnLeft(); }
function turnAround() { turnLeft(); turnLeft(); }

/// Scene 1
function climbStairs() {
	while (isBlocked()) {
		turnLeft();
		step();
		turnRight();
		step();
	}
}
/// end scene 1

// scene 2
function decendStairs() {
	turnRight();
	climbStairs();
	turnAround();
	step();
	turnLeft();
	step();
	turnAround()
}
// end scene 2


climbStairs();
placeBeeper();
decendStairs();