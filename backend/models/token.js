const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
	},
	token: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		index: { expires: "1h" },
	},
});

module.exports = mongoose.model("Token", tokenSchema);
