const User = require("../models/user");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const connectDatabase = require("../config/database");

// Setting dotenv file
dotenv.config({ path: "backend/config/config.env" });

connectDatabase();

const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});
let email, password;

readline.question(`What's your email?`, (email) => {
	console.log(`Hi ${email}!`);
	email = email;

	readline.close();
});

readline.question(`What's your password?`, (password) => {
	console.log(password);
	password = password;
	readline.close();
});

const newPassword = bcrypt.hashSync(password, 10);
const user = {
	email: email,
	password: newPassword,
	role: "admin",
	verified: true,
};

const createAdmin = async () => {
	try {
		await User.insertOne(user);
		console.log("Admin Added.");
		process.exit();
	} catch (error) {
		console.log(error.message);
		process.exit();
	}
};

createAdmin();
