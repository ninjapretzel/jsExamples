
const db = require("../models");
const express = require("express");

const router = express.Router();

router.get("/api/workouts", async (req, res) => {
	const workouts = await db.workout.find({})
		.populate("exercises");
	
	workouts.sort( (a,b) => {
		return a.day.getTime() - b.day.getTime();
	});
	
	res.json(workouts);
	
});

router.get("/api/workouts/range", async (req, res) => {
	
});

router.put("/api/workouts/:id", async (req, res) => {
	const id = req.params.id;
	
	const workout = await db.workout.findOne( { _id: id } );
	
	if (!workout) {
		res.statusCode = 404;
		res.json( { success: false, message: "workout not found" } );
		return;
	}
	const { name, type, duration, weight, sets, reps, distance } = req.body;
	
	try {
		const exercise = await db.exercise.create({ 
			name, type, duration, weight, sets, reps, distance 
		});
		
		workout.exercises.push(exercise._id);
		
		await db.workout.replaceOne( { _id: id }, workout);
		
		res.statusCode = 200;
		res.json( { success: true } );
		
	} catch (err) {
		res.statusCode = 500;
		res.json( { success: false, message: "bad request, could not create exercise" } );
	}
	
	
});

router.post("/api/workouts", async (req, res) => {
	const workout = new db.workout({
		exercises: [],
	});
	
	await workout.save();
	
	res.statusCode = 200;
	res.json(workout);
});


module.exports = router;
