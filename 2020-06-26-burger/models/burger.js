const orm = require("../config/orm");
const Burger = require("../types/burger");

module.exports = {
	getAll: async function() {
		return (await orm.selectAll("burger")).map(data => Burger.from(data));
	},
	insert: async function(burger) {
		return await orm.insertOne("burger", burger);
	}, 
	update: async function(burger) {
		return await orm.updateOne("burger", burger);	
	}
}