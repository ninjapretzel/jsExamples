

const db = require("./models");

async function main() {
	console.log(await db.exercise.find({}));
	console.log(await db.workout.find({}));
}
main();
