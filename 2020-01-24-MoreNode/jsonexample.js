// raw JSON string
zzz = "{\"username\":\"coolguy1337\",\"password\":\"password\",\"email\":\"coolguy1337@mailismagic.com\",\"city\":\"parker\",\"state\":\"colorado\",\"zip\":\"80134\"}"

str = "hey \"mom\" !"
console.log(str);

x = { // Strict JSON literal
	"username":"coolguy1337",
	"password":"password",
	"email":"coolguy1337@mailismagic.com",
	"city":"parker",
	"state":"colorado",
	"zip":"80134"
}

y = { // Loose JSON literal
	username: 'coolguy1337',
	password: 'password',
	email: 'coolguy1337@mailismagic.com',
	city: 'parker',
	state: 'colorado',                     
	zip: '80134'                           
}                                        

// Convert string to object 
z = JSON.parse(zzz);

// Convert objects to strings
xxx = JSON.stringify(x);
yyy = JSON.stringify(y);

// Print stuff out
console.log("\n\n\nx's username: " + x["username"])
console.log("x: ")
console.log(x)
console.log("x json: " + xxx)

console.log("\n\n\ny's username: " + y["username"])
console.log("y: ")
console.log(y)
console.log("y json: " + yyy)
console.log("\n\n\nz's username: " + z["username"])
console.log("z: ")
console.log(z)
console.log("z json: " + zzz)