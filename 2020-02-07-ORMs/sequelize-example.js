const { Sequelize, Model, DataTypes } = require('sequelize');
// This uses a database in memory,
// rather than as a connection to a database server.
const sequelize = new Sequelize('sqlite::memory:');

// Similar to a SQL script, 
// Seqelize needs to know how the data is structured.
class User extends Model {}
User.init({
	username: DataTypes.STRING,
	birthday: DataTypes.DATE
}, { sequelize, modelName: 'user' });

// 
(async () => {
	await sequelize.sync();
	const jane = await User.create({
	  username: 'janedoe',
	  birthday: new Date(1980, 6, 20)
	});
	console.log(jane.toJSON());
})();