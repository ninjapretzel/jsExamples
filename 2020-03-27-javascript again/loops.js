
debugger;
debugger;
// for loops
// use when you know either exactly how many times it should run
// or when you know the upper bound of how many times it may run
// for ( <init> ; <condition> ; <increment> ) {
//		<body>
// }

for (var i = 0; i < 2; i++) {
	console.log(i);
}

console.log("Done with for!");

// while loops:
// Use when you don't know how many times you want to loop
// For example, taking user input
// while ( <condition> ) { 
//		<body>
// }
// One place to use this is in a web page with
// the following methods:
// alert("message"); 
// Pops up a window with a text entry in it:
// var x = prompt("question");
var k = 0;
while (k < 10) {
	console.log(k);
	
	k++;	
}

console.log("done with while");

/*
var choice = null
while (!(choice === "ROCK" || choice === "SCISSORS" || choice === "PAPER")) {
	choice = prompt("Choose one: ROCK, PAPER or SCISSORS");
}
console.log("You chose: " + choice);
*/