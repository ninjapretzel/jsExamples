// Load required modules 
// They're using `var` instead of `const`, likely old code.
const fs		= require('fs');			// builtin module
const path		= require('path');			// builtin module
const Sequelize	= require('sequelize');		// external module
const basename	= path.basename(module.filename); //"index.js", but more flexible
const env		= process.env.NODE_ENV || 'development'; // See what environment node is running in.
const config	= require(__dirname + '/../config/config.json')[env];
// Object that holds Sequelize models, and is the export of this module
const db		= {};

let sequelize;
// Figure out where to load data connection information from,
if (config.use_env_variable) {
	// if config says to use environment variables,
	// load all host location/database/credentials from environment variables
	sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	// otherwise, load data specified in the config object
	sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Load a list of all files in directory
fs.readdirSync(__dirname)
	// Filter it down...
	.filter(function(file) {
	// discard dotfiles (.gitignore or other 'hidden' files)
	return (file.indexOf('.') !== 0) 
		// discard file currently being loaded (index.js)
		&& (file !== basename) 
		// discard any non-js files
		&& (file.slice(-3) === '.js');
	}) // Loop over remaining files
	// (every other non-hidden '.js' file)
	.forEach(function(file) {
		// Import that other file with sequelize
		const model = sequelize.import(path.join(__dirname, file));
		// Store that imported module inside of the exported `db` object
		db[model.name] = model;
	});

// Once all modules are dynamically loaded, post-process them
Object.keys(db).forEach(function(modelName) {
	// If there is an `associate` function in the model
	// call it and pass the whole db to it
	// Probably used to stitch tables together
	// (eg like that Department/Role/Employee example)
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// assign the reference to the instance of sequelize into the exported `db` object
db.sequelize = sequelize;
// assign the loaded Sequelize library into the exported `db` object
db.Sequelize = Sequelize;

// export all loaded models
module.exports = db; 
