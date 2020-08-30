const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const corsConfig = {
	origin: 'http://localhost:3000', // This should come from a config file!
}

const app = express();
app.use(express.static("public"));
app.use(cors(corsConfig));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const login = require("./routes/login");
app.use(login);

const port = 3001
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
