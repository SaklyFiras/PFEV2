const mongoose = require("mongoose");
const groupsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter name"],
	},
	owner: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	password: {
		type: String,
		required: [true, "Please enter password"],
		select: false,
	},

	description: {
		type: String,
		required: [true, "Please enter description"],
	},
	blockedUsers: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	joinRequests: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	members: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
	],
	posts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Post",
		},
	],
	createdAt: {
		type: Date,
		default: Date.now,
	},
	image: {
		public_id: {
			type: String,
		},
		url: {
			type: String,
		},
	},
	tags: [
		{
			type: String,
		},
	],
	news: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			title: {
				type: String,
				required: [true, "Please enter title"],
			},
			description: {
				type: String,
				required: [true, "Please enter description"],
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
	ratings: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			rating: {
				type: Number,
				required: [true, "Please enter rating"],
			},
		},
	],

	faq: [
		{
			user: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
			question: {
				type: String,
				required: [true, "Please enter question"],
			},
			description: {
				type: String,
				required: [true, "Please enter description"],
			},
			answer: [
				{
					comment: {
						type: String,
					},
					replies: [
						{
							type: String,
						},
					],
				},
			],
			upvotes: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			downvotes: [
				{
					type: mongoose.Schema.Types.ObjectId,
					ref: "User",
				},
			],
			status: {
				type: String,
				default: "open",
				enum: {
					values: ["open", "closed"],
					message: "status is either: open or closed",
				},
			},
			createdAt: {
				type: Date,
				default: Date.now,
			},
		},
	],
});
module.exports = mongoose.model("Group", groupsSchema);

// Path: backend\models\groups.js
