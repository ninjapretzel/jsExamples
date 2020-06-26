const mysql = require("mysql2/promise");
const express = require("express");
const handlebars = require("express-handlebars");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());



app.listen(PORT, () => console.log("BURGER listening on port: " + PORT));