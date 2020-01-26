// Module Demo
// We can import code that we have written in another file!
const imported1 = require("./external1.js")

// We don't need to provide the .js extension 
// if we are loading javascript files
const imported2 = require("./external2");

// Demonstrate that some things can be changed, others can't
imported1.exportedFunc();
imported1.exportedFunc();
imported1.exportedFunc();

// This has no effect, as `localThing` was not exported!
imported1.localThing = 200; 
// This line can change `exportedThing` and change the behavior of the module
imported1.exportedThing = 50;
imported1.exportedFunc();
imported1.exportedFunc();

// The second module was set to be a function, 
// so we can call it directly:
imported2("fish");
imported2("personal data");
// It also has a field that was added:
console.log(imported2.field);
