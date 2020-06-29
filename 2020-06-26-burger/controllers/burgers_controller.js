const express = require("express");
const Burger = require("../types/burger");
const BurgerModel = require("../models/burger");

const router = express.Router();

router.get("/", async function(request, response) {
	const burgers = await BurgerModel.getAll();
	
	response.send(burgers);
});

router.post("/create", async function(request, response) {
	const data = request.body;
	const burger = new Burger(-1, data.name, false);
	
	const id = await BurgerModel.insert(burger);
	
	if (id > 0) {
		response.send({ success: true, id });	
	} else {
		response.send({ success: false, errorCode: id });	
	}
	
});

router.post("/devour/:id", async function(request, response){
	
	const errorCode = await BurgerModel.devour(request.params.id);
	
	if (!errorCode) {
		response.send( { success: true });
	} else {
		response.send( {success: false, errorCode });
	}
	
});





module.exports = router;