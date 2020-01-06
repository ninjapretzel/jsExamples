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

// We assume karel is facing forward along the direction that we want him to add numbers in
// and has a beeper below him
function addBeepers() {
	// Trace to the end of the beepers to add
	while(isNearBeeper()) {
		step();
	}
	
	// Turn around and have karel march back 
	turnAround();
	step();
	
	// While karel on a beeper
	while(isNearBeeper()) {
		// Take all of the beepers
		while(isNearBeeper()) {
			takeBeeper();
		}
		// And move to the next.
		step();
	}
	// When kare is not on a beeper, 
	// place the 'sum' by placing all beepers karel has onto the ground
	while(hasBeeper()) {
		placeBeeper();
	}
	
	// Move back up one cell
	// so karel is in the same postiion/direction 
	// he started in 
	turnAround();
	step();
}

// Move onto the first beeper 
step();

// Repeatedly add stacks of beepers 
while(isNearBeeper()) {
	// Faces karel north 
	turnLeft();
	
	// Call the method we made above
	addBeepers();
	
	// Faces karel back eastward 
	turnRight();
	
	// take a step eastward
	step();
}

// Just because we can,
// add all of the sums karel calculated before

// Line up on the last beeper karel placed
turnAround();
step();
turnLeft();
step();

// Face him along the beepers to add 
// (this time, facing west)
turnRight();
// call the same method to get him to add all of the sums.
addBeepers();


