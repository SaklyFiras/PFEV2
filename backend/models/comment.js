const mongoose = require("mongoose");
const commentSchema = new mongoose.Schema({
	content: {
		type: String,
		required: [true, "Please enter comment"],
		
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	post: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Post",
		required: true,
	},
	// reply:[ {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: "comment",
	// 	required: false,
	// }],
	likes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	dislikes: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: Date,
	commentType: {
		type: String,
		enum: {
			values: ["treatmentPlan", "diagnosis"],
			message: "commentType is either: treatmentPlan or diagnosis",
		},
		required: true,
	},
});

module.exports = mongoose.model("Comment", commentSchema);
