const Schema = require("mongoose").Schema;

const UserSchema = new Schema( { 
	username: { type: String },
	hash: { type: String },
	role: { type: String, enum: [ "User", "Employee", "Admin" ] },
});

module.exports = UserSchema
