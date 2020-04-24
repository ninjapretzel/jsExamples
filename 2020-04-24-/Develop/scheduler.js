

// Dynamically create elements on the page 
// for the user to edit their schedule with
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
	entry.attr("id", "entry" + hour);
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
function updateHighlights() {
	// Get the element that all hours get added to
	let hours = $("#hours");
	// Get the children from that element
	let children = hours.children();
	
	// Get the 'hour' of the current time
	// in military time (0-23)
	let time = moment().format("H");
	// console.log(time);
	
	// Loop over all children	
	for (let i = 0; i < children.length; i++) {
		// Calculate the hour for the current child 
		let hr = 9 + i;
		
		// Find that child on the page
		// eq(n) is jquery's method that selects the nth match
		let child = children.eq(i); 
		
		// Reset it by removing any 
		// colorization classes that are already on it 
		child.removeClass("past present future");
		
		// Compare times to see if it is in past/present/future
		// and color accordingly.
		if (hr < time) {
			child.addClass("past");
		} else if (hr > time) {
			child.addClass("future");
		} else {
			child.addClass("present");
		}
	}
}

// When page is loaded....
$(document).ready(function() {
	
	// Loop to create 
	for (let i = 0; i < 9; i++) {
		// Turns out this is kinda difficult to do with momentjs...
		let hr = 9 + i;
		let half = (hr >= 12) ? "pm" : "am";
		if (hr > 12) { hr -= 12; }
		
		// Create the div w/ textarea and button for that hour 
		let id = hr + half;
		$("#hours").append( createHourDiv(id) );
		
		// See if we have data stored, and load it if we do
		if (localStorage[id]) {
			$("#entry"+id).val(localStorage[id]);
		}
	}
	
	// Immediately update highlights 
	updateHighlights();
	// Repeatedly call updateHighlights
	// timeout is in milliseconds, 1000ms = 1 second
	setInterval(updateHighlights, 10000);
	
	// Set current day with momentjs
	$("#currentDay").text(moment().format("YYYY MMM, ddd Do"))
	
	// Callback for clicking save button
	$(".saveBtn").on("click", function(evt){
		// Get the id of the clicked button
		let id = evt.currentTarget.id;
		// Get id of matching text entry
		let entryId = "entry" + id;
		
		// Find entry and get text from it...
		let entry = $("#" + entryId);
		let text = entry.val();
		
		// Save text into localStorage.
		localStorage[id] = text;
		
	})

});
