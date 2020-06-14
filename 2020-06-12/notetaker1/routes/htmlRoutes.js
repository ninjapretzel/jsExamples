const express = require("express");


const router = express.Router();
//get/routes
//* rout

router.get("/notes", function(request, response) {
	response.sendFile("notes.html", {root: './public'});
});

router.get("/*", function(request, response) {
	response.sendFile("index.html", {root: './public'});
});

module.exports = router;