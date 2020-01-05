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
step();
while(!isBlocked()) {
	turnLeft();
	takeBeeperTower();
	turnLeft();
	step();
}