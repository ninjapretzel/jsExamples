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
Exercise.methods.fmt = function() { 
	return `Exercise.\nName: ${this.name}\nType: ${this.type}`
	+ (this.duration ? `\nDuration: ${this.duration}` : ``)
	+ (this.weight ? `\nWeight: ${this.weight}lbs` : ``)
	+ (this.reps && this.sets ? `\nReps: ${this.reps} x ${this.sets} sets` : ``)
}

// Static Methods: 
Exercise.statics.findByName = async function(name) {
	return await this.find({name});
}
Exercise.statics.findByType = async function(type) {
	return await this.find({type});
} 


module.exports = Exercise;
