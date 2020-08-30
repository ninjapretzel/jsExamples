const mongoose = require("mongoose");

mongoose.connect(`mongodb://localhost:27017/expressReactLogin`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const UserSchema = require("./user");
const User = mongoose.model("User", UserSchema);

async function ensureAdminExists() {
	const check = await User.findOne( { username: "admin" } )
	
	if (!check) { // No admin user? Create a default one.
		
		await User.create({
			username: "admin",
			password: "changeMe",
			role: "Admin",
		});
		
	}
	
}
ensureAdminExists(); 

module.exports = {
	User,
	mongoose
};
