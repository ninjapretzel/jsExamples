const Schema = require("mongoose").Schema;

const UserSchema = new Schema( { 
	username: { type: String },
	hash: { type: String },
	role: { type: String, enum: [ "Employee", "Admin" ] },
});

module.exports = UserSchema
