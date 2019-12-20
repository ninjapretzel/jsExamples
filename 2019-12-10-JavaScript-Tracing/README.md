# Examples from 2019-12-10
## Basic Javascript (Embedded in a webpage)
### `one.html`
- Variable assignment
	- Form is `<kind>? <variableName> = <expression>`
	- `<kind>` can be one of `var`, `let`, or `const`, and is optional
	- `var` and `let` have a subtle difference
	- `const` cannot be reassigned (changed) later.
	- `<variableName>` is the name of the variable, cannot have whitespace in it.
	- `<expression>` can be a constant value, a variable name, a function call, or math between the previous
	- Example `var x = 20`
	- Example `var name = "bob"`
	- Example `var threeX = 3 * x`
- Function calls
	- form is `<functionName> ( <parameters> )`
	- Example `alert("Attention!")`
	- Example `console.log("Secret message.")`
	
### `two.html`
- Logic statements
- 6 kinds of comparisons:
	- `<` - Less Than
	- `>` - Greater Than
	- `<=` - Less Than or equal to
	- `>=` - Greater Than or equal to
	- `==` - Equal to /  `===` (strict version)
	- `!=` - Not Equal to `!==` (strict version )
- `if` statement
	- form is `if ( <condition> ) <body> { else <body> }?`
	- Checks `<condition>`, 
		- if `true` runs the paired `<body>`
		- if `false`, and there is a paired `else`, runs the `else`'s `<body>`
		- Suggested to always wrap the `if`/`else` `<body>` in curly braces `{}`
- `for` statement
	- form is `for ( <initialize> ; <condition> ; <increment> ) <body>`
	- Runs `<initialize>`
	- `TopOfLoop:` Checks `<condition>`
		- if `true`, enters the `<body>`
			- When the `<body>` is finished, runs `<increment>`
			- Then goes up to `TopOfLoop:`
		- if `false`, skips to the end of the loop.
- `while` statement
	- form is `while ( <condition> ) <body>`
	- `TopOfLoop:` Checks `<condition>`
		- if `true`, enters the `<body>`
			- When the `<body>` is finished, goes back up to `TopOfLoop:`
		- if `false`, skips to the end of the loop.
### `array.js`
- Arrays
	- Square braces `[]` are used to declare arrays
	- They are filled with things we want to put in the array
		- Example: `var arr = [ 1, 2, 3, 4, 5 ]` // Creates an array with 5 elements.
	- Square braces are also used to read or change the array.
		- Example: `arr[3] = 9001`  // Assigns `9001` to index `3`
		- Example: `console.log(arr[3])` // Would print `9001` 
	- Arrays work really well with loops
### `object.js`
- Objects
	- Don't really need to worry too much about this kind of thing right now
	- But you will often use objects provided by the browser
	- For example, `console` is also an object

## Examples to trace by hand
### `trace1.js`
### `trace2.js`
### `trace3.js`
### `trace4.js`
- While loop trace
### `trace4-for.js`
- For loop version of trace-4 