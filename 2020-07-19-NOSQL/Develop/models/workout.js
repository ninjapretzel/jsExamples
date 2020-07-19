const Schema = require("mongoose").Schema;

// The permitted SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
const Workout  = new Schema({
	day: Date,
	exercises: Array
});

// Instance Methods: 
Workout.methods.yeet = async function() { }
// Static Methods: 
Workout.statics.owo = async function() {} 


module.exports = Workout;
