const express = require("express");
const Burger = require("../types/burger");
const BurgerModel = require("../models/burger");

const router = express.Router();

router.get("/", async function(request, response) {
	const burgers = BurgerModel.getAll();
	
	response.send(burgers);
});