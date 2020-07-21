

const db = require("./models");

async function main() {
	console.log(await db.exercise.find({}));
	console.log(await db.workout.find({}));
	console.log(await db.exercise.findByName("Bench Press"));
	console.log(await db.exercise.findByType("cardio"));
	
	
	let exercises = (await db.exercise.find({}))
		.map(it => new db.exercise(it) );
	console.log( exercises.map(it => it.fmt() ));
	
	let workouts = (await db.workout.find({}).populate('exercises'))
		.map(it => new db.workout(it) )
	
	console.log(workouts);
	console.log(workouts[0].exercises);
	
	
}
main();
