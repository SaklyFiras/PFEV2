const Groups = require("../models/groups");
const User = require("../models/user");
const Post = require("../models/Post");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;

// Create a new group => /api/v2/groups/new
exports.newGroup = catchAsyncErrors(async (req, res, next) => {
	// images
	if (req.body.image) {
		const result = await cloudinary.uploader.upload(req.body.image, {
			folder: "groups",
		});
		req.body.image = {
			public_id: result.public_id,
			url: result.secure_url,
		};
	}

	req.body.owner = req.user.id;
	req.body.password = generatePassword();
	const group = await Groups.create(req.body);

	res.status(201).json({
		success: true,
		group,
	});
});

// Delete group => /api/v2/groups/:id
exports.deleteGroup = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`)
		);
	}
	// Deleting images associated with the product
	for (let i = 0; i < group.images.length; i++) {
		const result = await cloudinary.uploader.destroy(group.images[i].public_id);
	}
	await group.remove();

	res.status(200).json({
		success: true,
		message: "Group is deleted.",
	});
});

// Get all groups => /api/v2/groups
exports.getGroups = catchAsyncErrors(async (req, res, next) => {
	const groups = await Groups.find().populate("owner", "name");

	res.status(200).json({
		success: true,
		groups,
	});
});

// Get single group details => /api/v2/groups/:id
exports.getGroup = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id)
		.populate("owner", "name")
		.populate("members")
		.populate({
			path: "posts",
			populate: {
				path: "user",
			},
		})
		.populate({
			path: "posts",
			populate: {
				path: "comments",
				populate: {
					path: "user",
				},
			},
		})
		.populate("news.user", "status avatar")
		.populate("joinRequests")
		.populate("blockedUsers")
		.select("+password");

	if (req.user.id !== group.owner.id) {
		group.password = undefined;
	}

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		group,
	});
});

// add a faq to group => /api/v2/groups/:id/faq
exports.addFaqToGroup = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	req.body.user = req.user.id;
	req.body.description = req.body.description.replace(/\n/g, "<br>");
	group.faq.push(req.body);
	await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Send Request To join group => /api/v2/groups/:id
exports.sendRequestToJoinGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (group.members.includes(req.user.id)) {
		return next(
			new ErrorHandler(`You are already a member of this group`, 400)
		);
	}
	if (group.joinRequests.includes(req.user.id)) {
		return next(
			new ErrorHandler(
				`You have already sent a request to join this group`,
				400
			)
		);
	}
	group.joinRequests.push(req.user.id);

	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});
// Accept Request To join group => /api/v2/groups/:id
exports.acceptRequestToJoinGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	if (!group.owner.equals(req.user.id)) {
		return next(
			new ErrorHandler(`You are not authorized to accept requests`, 400)
		);
	}

	for (let i = 0; i < group.joinRequests.length; i++) {
		if (!group.joinRequests[i]._id.equals(req.body.userId)) {
			return next(
				new ErrorHandler(
					`This user has not sent a request to join this group`,
					400
				)
			);
		}
	}

	if (group.blockedUsers.includes(req.body.userId)) {
		return next(new ErrorHandler(`This user is blocked from this group`, 400));
	}
	group.joinRequests.splice(group.joinRequests.indexOf(req.body.userId), 1);
	group.members.push(req.body.userId);
	group.news.push({
		user: req.body.userId,
		title: `${req.body.userName} has joined the group`,
		description: `${req.body.userName} has joined the group , welcome ${req.body.userName}!`,
	});

	group = await group.save();

	res.status(200).json({
		success: true,
		group,
	});
});

//Decline Request To join group => /api/v2/groups/:id
exports.declineRequestToJoinGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.owner.equals(req.user.id)) {
		return next(
			new ErrorHandler(`You are not authorized to decline requests`, 400)
		);
	}
	if (!group.joinRequests.includes(req.body.userId)) {
		return next(
			new ErrorHandler(`This user has not requested to join this group`, 400)
		);
	}
	group.joinRequests.splice(group.joinRequests.indexOf(req.body.userId), 1);
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Get all groups of a user => /api/v2/groups/mygroups
exports.getMyGroups = catchAsyncErrors(async (req, res, next) => {
	const groups = await Groups.find({ members: req.user.id });

	res.status(200).json({
		success: true,
		groups,
	});
});

// Block a user from a group => /api/v2/groups/:id/block
exports.blockUserFromGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.admin.equals(req.user.id)) {
		return next(new ErrorHandler(`You are not authorized to block users`, 400));
	}
	if (!group.members.includes(req.body.userId)) {
		return next(
			new ErrorHandler(`This user is not a member of this group`, 400)
		);
	}
	group.members.splice(group.members.indexOf(req.body.userId), 1);
	group.blockedUsers.push(req.body.userId);
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Unblock a user from a group => /api/v2/groups/:id/unblock
exports.unblockUserFromGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.admin.equals(req.user.id)) {
		return next(
			new ErrorHandler(`You are not authorized to unblock users`, 400)
		);
	}
	if (!group.blockedUsers.includes(req.body.userId)) {
		return next(
			new ErrorHandler(`This user is not blocked in this group`, 400)
		);
	}
	group.blockedUsers.splice(group.blockedUsers.indexOf(req.body.userId), 1);
	group.members.push(req.body.userId);
	console.log(group);
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Leave a group => /api/v2/groups/:id/leave
exports.leaveGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`)
		);
	}
	if (!group.members.includes(req.user.id)) {
		return next(new ErrorHandler(`You are not a member of this group`, 400));
	}
	group.members.splice(group.members.indexOf(req.user.id), 1);
	group.news.push({
		user: req.user.id,
		title: `${req.user.name} left the group`,
		description: `${req.user.name} left the group ${group.name}  ,You will be missed :(`,
	});
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Get all members of a group => /api/v2/groups/:id/members
exports.getGroupMembers = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id).populate("members");

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		members: group.members,
	});
});

// Get all requests of a group => /api/v2/groups/:id/requests
exports.getGroupRequests = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id).populate("requests");

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		requests: group.requests,
	});
});

//Block a user from a group => /api/v2/groups/:id/block
exports.blockUserFromGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.owner.equals(req.user.id)) {
		return next(new ErrorHandler(`You are not authorized to block users`, 400));
	}
	if (!group.members.includes(req.body.userId)) {
		return next(
			new ErrorHandler(`This user is not a member of this group`, 400)
		);
	}
	group.members.splice(group.members.indexOf(req.body.userId), 1);
	group.blockedUsers.push(req.body.userId);
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Unblock a user from a group => /api/v2/groups/:id/unblock
exports.unblockUserFromGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.owner.equals(req.user.id)) {
		return next(
			new ErrorHandler(`You are not authorized to unblock users`, 400)
		);
	}
	if (!group.blockedUsers.includes(req.body.userId)) {
		return next(
			new ErrorHandler(`This user is not blocked in this group`, 400)
		);
	}
	group.blockedUsers.splice(group.blockedUsers.indexOf(req.body.userId), 1);
	group.members.push(req.body.userId);
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Get all blocked users of a group => /api/v2/groups/:id/blocked
exports.getGroupBlockedUsers = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id).populate("blockedUsers");

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		blockedUsers: group.blockedUsers,
	});
});

// Get all posts of a group => /api/v2/groups/:id/posts
exports.getGroupPosts = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id).populate("posts");

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}

	res.status(200).json({
		success: true,
		posts: group.posts,
	});
});
// ADD post to a group => /api/v2/groups/:id/posts
exports.addPostToGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (
		!group.members.includes(req.user.id) ||
		!group.owner.equals(req.user.id)
	) {
		return next(new ErrorHandler(`You are not authorized to add posts`, 400));
	}
	req.body.user = req.user.id;
	const post = await Post.create(req.body);
	group.posts.push(post._id);
	group.news.push({
		user: req.user.id,
		title: `${req.user.name} added a new post to the group `,
		description: `${req.user.name} posted new post with title ${post.postInfo.title}`,
	});
	group = await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

// Delete a post from a group => /api/v2/groups/:id/posts/:postId
exports.deletePostFromGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.owner.equals(req.user.id)) {
		return next(
			new ErrorHandler(`You are not authorized to delete posts`, 400)
		);
	}
	if (!group.posts.includes(req.body.postId)) {
		return next(new ErrorHandler(`This post is not in this group`, 400));
	}
	group.posts.splice(group.posts.indexOf(req.body.postId), 1);
	group = await group.save();
	await Post.findByIdAndDelete(req.body.postId);
	res.status(200).json({
		success: true,
		group,
	});
});

// Get all news of a group => /api/v2/groups/:id/news
exports.getGroupNews = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id).populate(
		"news.user",
		"name avatar status"
	);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	res.status(200).json({
		success: true,
		news: group.news,
	});
});

//Join a group using name and password => /api/v2/groups/join/direct
exports.joinGroupWithNameAndPassword = catchAsyncErrors(
	async (req, res, next) => {
		const { name, password } = req.body;
		if (!name || !password) {
			return next(new ErrorHandler(`Please provide name and password`, 400));
		}
		const group = await Groups.findOne({ name: name, password: password });
		if (!group) {
			return next(new ErrorHandler(`Invalid name or password`, 401));
		}

		for (let i = 0; i < group.members.length; i++) {
			if (group.members[i]._id.equals(req.user.id)) {
				return next(
					new ErrorHandler(
						`You are already a member of this group with name ${group.name}`,
						400
					)
				);
			}
		}
		group.members.push(req.user.id);
		group.news.push({
			user: req.user.id,
			title: `${req.user.name} joined the group`,
			description: `${req.user.name} joined the group ${group.name}`,
		});
		await group.save();
		res.status(200).json({
			success: true,
			group,
		});
	}
);

//Rate a group => /api/v2/groups/:id/rate
exports.rateGroup = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.members.includes(req.user.id)) {
		return next(new ErrorHandler(`You are not a member of this group`, 400));
	}

	group.ratingCount = group.ratingCount + 1;
	group.rating =
		(group.rating * (group.ratingCount - 1) + req.body.rating) /
		group.ratingCount;

	group.news.push({
		user: req.user.id,
		title: `${req.user.name} rated the group`,
		description: `${req.user.name} rated the group ${group.name} with ${req.body.rating} stars`,
	});
	await group.save();
	res.status(200).json({
		success: true,
		group,
	});
});

const generatePassword = () => {
	var pass = "";
	var str =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz0123456789@#$";

	for (let i = 1; i <= 8; i++) {
		var char = Math.floor(Math.random() * str.length + 1);

		pass += str.charAt(char);
	}
	return pass;
};
