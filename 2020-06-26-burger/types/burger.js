
class Burger {
	id = -1;
	name = "unnamed burger";
	devoured = false;
	
	constructor(id, name, devoured) {
		this.id = id;
		this.name = name;
		this.devoured = devoured;
	}
	
	static from(data) {
		return new Burger(data.id || -1,
					data.name || "unnamed burger",
					data.devoured || false);
	}
	
	
}

module.exports = Burger;