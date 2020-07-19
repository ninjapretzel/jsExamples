const Schema = require("mongoose").Schema;

// The permitted SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
const Exercise  = new Schema({
	type: String,
	name: String,
	duration: Number,
	weight: Number,
	reps: Number,
	sets: Number
	
});

// Instance Methods: 
Exercise.methods.yeet = async function() { }
// Static Methods: 
Exercise.statics.owo = async function() {} 


module.exports = Exercise;
