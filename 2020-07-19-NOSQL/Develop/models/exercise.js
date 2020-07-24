const Schema = require("mongoose").Schema;

function requiresWRS() {
	return this.type === "resistance" && !this.duration;
}
function requiresDist() {
	return this.type === "resistance" && !this.weight && !this.reps && !this.sets;
}

// The permitted SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
const Exercise  = new Schema({
	type: { type: String, minlength: 1, maxlength: 16, required:"Exercises must have a type!" },
	name: { type: String, minlength: 1, maxlength: 16, required:"Exercises must have a name!" },
	duration: { type: Number, required:"Exercises must have a duration!", min:1 },
	weight: { type: Number, required: requiresWRS, min:1 },
	reps: { type: Number, required: requiresWRS, min:1 },
	sets: { type: Number, required: requiresWRS, min:1 },
	distance: { type: Number, required: requiresDist, min:1 }
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
