const START_HOUR = 9;
const NUM_HOURS = 8;

// Dynamically create elements on the page 
// for the user to edit their schedule with
// Like if we had a template to build a chistmas tree (analogy)
// where we would take plywood, paint it, wrap it with lights, etc
// this function would return the "tree" that we built
// we can create multiple "nearly identical" copies of the same tree
// with this "blueprint"/function
// (they differ only by a number)
function createHourDiv(hour) {
	// Start with a div
	let div = $("<div>");
	div.addClass("row"); // add a class to it 
	
	// Make another div to hold the "time"/"hour" text
	let time = $("<div>");
	div.append(time);
	time.addClass("col-md-1");
	time.text(hour);
	
	// Make a textarea to hold the text entry of the user
	let entry = $("<textarea>");
	entry.addClass("col-md-10");
	// entry10pm
	// functionCall(arg1, arg2, arg3, arg4, arg5)
	entry.attr("id", "entry" + hour); // entry9am
	div.append(entry);
	
	// Make a button the user can click to save that hour's entry.
	let button = $("<button>");
	button.addClass("col-md-1 btn-primary btn saveBtn");
	button.attr("id", hour);
	div.append(button);
	let icon = $("<i>").addClass("fas fa-save");
	button.append(icon);
	
	// Wrap everything in another div
	return $("<div>").addClass("container").append(div);
}

// Update the highlights of all 'hours' 
// (Analogy): Quickly toggling/flashing the lights on all the trees
// This is like some rigging a stagehand would do 
// to prepare some special effect. 
function updateHighlights() {
	// Get the element that all hours get added to
	let hours = $("#hours");
	// Get the children from that element
	let children = hours.children();
	
	// Get the 'hour' of the current time
	// in military time (0-23)
	let currentTime = moment().format("H");
	// console.log(time);
	
	// Loop over all children	
	for (let i = 0; i < children.length; i++) {
		// Calculate the hour for the current child 
		let hr = START_HOUR + i;
		
		// Find that child on the page
		// eq(n) is jquery's method that selects the nth match
		let child = children.eq(i); 
		// let child = hours[i];
		
		// Reset it by removing any 
		// colorization classes that are already on it 
		child.removeClass("past present future");
		
		// Compare times to see if it is in past/present/future
		// and color accordingly.
		if (hr < currentTime) {
			child.addClass("past");
		} else if (hr > currentTime) {
			child.addClass("future");
		} else {
			child.addClass("present");
		}
	}
}

// When page is loaded....
$(document).ready(function() {
	
	// With our analogy, this part would be like setting up
	// the chistmas trees on the stage, and hooking to the lighting system
	
	// Loop to create 
	for (let i = 0; i < NUM_HOURS+1; i++) {
		// Turns out this is kinda difficult to do with momentjs...
		let hr = START_HOUR + i;
		// ternary operator is ?:
		// condition ? valueIfTrue : valueIfFalse
		let half = (hr >= 12) ? "pm" : "am";
		if (hr > 12) { hr -= 12; } // military to standard time
		
		let id = hr + half; // "9am", or "12pm" or "3pm"
		// Create the div w/ textarea and button for that hour 
		// then add the div to the page
		$("#hours").append( createHourDiv(id) );
		
		// See if we have data stored, and load it if we do
		if (localStorage[id]) {
			// val() for user input
			// text() for text-on-page (also works for <textarea>, but )
			$("#entry"+id).val(localStorage[id]);
		}
	}
	
	// Immediately update highlights 
	// (Analogy): This would be like turning 
	// the tree lights on for the first time.
	updateHighlights();
	
	// (Analogy):
	// This would be like telling a stage hand to 
	// toggle the tree lights on and off quickly every second.
	// Repeatedly call updateHighlights
	// timeout is in milliseconds, 1000ms = 1 second
	setInterval(updateHighlights, 1000);
	
	// (Analogy): This would be like having stage hands
	// update the banner over the stage every day
	// Set current day with momentjs
	$("#currentDay").text(moment().format("YYYY MMM, ddd Do"))
	
	// Callback for clicking save button
	// (Analogy): This is like allowing the audience
	// to have a corkgun to shoot the trees with
	// and when a tree is shot, it lights up (or something)
	// (say presents fall out of the specific tree that was shot)
	// (because we don't really have a way to 'save' data in a play)
	// (the important thing is just *something* happens
	// 		to the tree that was shot)
	$(".saveBtn").on("click", function(event){
		// Get the id of the clicked button
		let id = event.currentTarget.id; // "9am"
		
		// Get id of matching text entry
		let entryId = "entry" + id; // "entry9am"
		
		// Find entry and get text from it...
		let entry = $("#" + entryId); // "#entry9am"
		let text = entry.val();
		
		// Save text into localStorage.
		localStorage[id] = text;
	})
	
});
