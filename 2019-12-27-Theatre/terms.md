# Terms 
### Script
- Contains the plans for the play
- A play script contains not just actions or plot, but also lists of required personnel and materials
	- Prop lists, costumes, character bios, motivations, reference material, and notes may also be included
- Code scripts contain plans for applications
	- A web page may have references to stylesheets, code, and other 'scripts'
	- other languages have references to required external code in their source code
- Unlike real life, computer scripts are read completely, and if they can't be understood they are rejected
- Like real life, there may be many implied knowledge or capability, based on the language, or existing application code.
	- Like a ballet dancer would know ballet terminology, and be able to do ballet,'
	- but probably would need to be taught how to breakdance or flamenco.
	
### Scenes
- like functions, a sequence of actions decided upon ahead of time
- They may be 'fired' when a cue happens
- Take this for example:
	- We have a man walking across the stage from point a to b.
	- He's a part in a larger scene, say there is a castle behind him, and a tree he walks past.
	- That function might cause a 'cue' to happen, which could trigger other 'scenes' to start,
	- For example, when he passes the tree, another actor waiting in the castle is supposed to shoot an arrow at him.

### Stage
- What the audience 'sees'
- Think of the webpage itself like a stage
	- All of the HTML inside the body
- During the play, 
	- You can place things on the stage,
	- move them around the stage, 
	- or remove them from the stage.
- "Stage" might include the specific device you are displaying on (screen size/available features)
	- Phones have a smaller touch-sensitive screen, but also have gps
	- Laptops have a wider footprint and bigger screen (not always touch sensitive), sometimes have gps, and also keyboards
	- Desktops may have many screens and have (typically) more powerful hardware
	- Server machines might have no screen and insanely powerful hardware, or live in virtual hardware
	
### Backstage
- Anything the audience doesn't see. 
- Anything you have in RAM but not on the webpage can be considered backstage.
- `console.log`, `console.warn` and `console.err` are like a message channel to a supervisor
- "Backstage" also includes the web-browser, and operating system

### "Stagehand" - Actors/Props
- Any 'thing' you have that you can tell to do things.
- the values in variables are like props/actors/stagehands.
- Some may be placed on the stage (shown on the webpage)
- Some may only assist with back-stage things.


### Cue 
- Events that occur that cause other things to begin



```js
function shoot(target, weapon) {
	let round = this.getAmmo();
	weapon.ready(round);
	this.aim(weapon, target);
	this.fire(weapon);
};

// When the play is prepared,
// all the actors are ready, costumed, and have read the script
// , eg, when the page loads,
// all of the html is built, css styles loaded, and scripts have all completed running
// $(document).ready(function() {...})
$(play).prepared(function() { 
	// A script might hold variables, which are references to things used in the play
	// We might need to have points on the stage 
	const a = { x: 120, y: 60 }
	const b = { x: 20, y: 60 }
	// References to actors;
	const bob = $("#bob");
	const george =  $("#george")
	// And props;
	const bow = $(".bow");
	const quiver = $(".quiver");
	george.give(quiver);
	george.give(bow);
	george.shoot = shoot.bind(george);
	// We'd start the play by kicking off the first action that needs to happen
	bob.walk(a, b)
	
	// Oh shoot, we need steak to serve the audience, and we don't have any
	// The play would continue even if some stagehand goes to get steaks.
	$.get("store/meat/steak", function(steaks) { 
		// This would happen when the person returns with the steaks
		kitchen.storeroom.add(steaks);
	})
	
	// We might also prepare cues to happen when something happens on stage
	george.when( bob.near( {x: 40, y:60 } ), function() {
		george.shoot(bob, bow);
	})
})

```