const Schema = require("mongoose").Schema;

// The permitted SchemaTypes are: String, Number, Date, Buffer, Boolean, Mixed, ObjectId, Array, Decimal128, Map
const Workout  = new Schema({
	day: Date,
	exercises: [{ type: Schema.Types.ObjectId, ref: 'exercise' }]
});



module.exports = Workout;
