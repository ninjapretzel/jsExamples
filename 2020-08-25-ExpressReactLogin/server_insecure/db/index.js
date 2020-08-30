const mongoose = require("mongoose");
const argon2 = require("argon2");

mongoose.connect(`mongodb://localhost:27017/expressReactLogin`, {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const UserSchema = require("./user");
const User = mongoose.model("User", UserSchema);

async function ensureAdminExists() {
	const check = await User.findOne( { username: "admin" } )
	
	if (!check) { // No admin user? Create a default one.
		const hash = await argon2.hash("changeMe");
		
		await User.create({
			username: "admin",
			hash,
			role: "Admin",
		});
		
	}
	
}
ensureAdminExists(); 

module.exports = {
	User,
	mongoose
};
