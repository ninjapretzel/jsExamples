function turnRight() { turnLeft(); turnLeft(); turnLeft(); }
function turnAround() {
	turnLeft();
	turnLeft();
}

function takeBeeperTower() {
	if (isNearBeeper()) {
		takeBeeper();
		step();
		takeBeeperTower();
		step();
	} else {
		turnAround();
	}
	
}

while(isNearBeeper() && !isBlocked()) {
	turnLeft();
	takeBeeperTower();
	turnLeft();
	step();
}