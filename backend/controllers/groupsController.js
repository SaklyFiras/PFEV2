const Groups = require("../models/groups");
const User = require("../models/user");
const Post = require("../models/Post");
const Comment = require("../models/comment");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const cloudinary = require("cloudinary").v2;
const { filterAndSearchGroups } = require("../utils/searchAndFilter");

// Create a new group => /api/v2/groups/new
exports.newGroup = catchAsyncErrors(async (req, res, next) => {
	const _group = await Groups.findOne({ name: req.body.name });
	if (_group) {
		return next(
			new ErrorHandler(`Group already exists with name: ${req.body.name}`)
		);
		// images
	}
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
	req.body.members = [req.user.id];
	const group = await Groups.create(req.body);

	res.status(201).json({
		success: true,
		message: "Group created successfully",
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
	await Post.deleteMany({ _id: { $in: group.posts } });
	await Comment.deleteMany({ post: { $in: group.posts } });
	await group.remove();

	res.status(200).json({
		success: true,
		message: "Group is deleted.",
	});
});

// Get all groups => /api/v2/groups
exports.getGroups = catchAsyncErrors(async (req, res, next) => {
	const filter = req.query.filter;
	const keyword = req.query.keyword;

	const resPerPage = 6;
	const groupsCount = await Groups.countDocuments();
	const joinedGroups = await Groups.find({ members: req.user.id });
	const ownedGroups = await Groups.find({ owner: req.user.id });
	let groups = await Groups.find().populate("owner", "name");
	groups = groups.filter(
		(group) =>
			group.owner._id !== req.user.id && !group.members.includes(req.user.id)
	);

	groups = filterAndSearchGroups(filter, keyword, groups, req.user);

	const currentPage = Number(req.query.page) || 1;
	const skip = resPerPage * (currentPage - 1);

	groups = groups.slice(skip).slice(0, resPerPage);
	const filtredGroups = groups.length;
	res.status(200).json({
		success: true,
		groups,
		groupsCount,
		filtredGroups,
		resPerPage,
		joinedGroups,
		ownedGroups,
	});
});

// Get single group details => /api/v2/groups/:id
exports.getGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (!group.members.includes(req.user.id) && req.user.role !== "admin") {
		return next(
			new ErrorHandler(`You are not authorised to see this group`, 400)
		);
	}

	group = await Groups.findById(req.params.id)
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
	if (group.blockedUsers.includes(req.user.id)) {
		return next(new ErrorHandler(`You are blocked by the admin of this group`));
	}
	group.joinRequests.push(req.user.id);
	group = await group.save();
	group = await Groups.findById(req.params.id)
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
	res.status(200).json({
		success: true,
		message: "Request has been sent to join this group",
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

	if (!group.joinRequests.includes(req.body.userId)) {
		return next(
			new ErrorHandler(
				`This user has not sent a request to join this group`,
				400
			)
		);
	}
	if (group.blockedUsers.includes(req.body.userId)) {
		return next(new ErrorHandler(`This user is blocked from this group`, 400));
	}
	group.joinRequests.splice(group.joinRequests.indexOf(req.body.userId), 1);
	group.members.push(req.body.userId);

	group = await group.save();
	group = await Groups.findById(req.params.id)
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

	const username = group.members.find(
		(member) => member._id == req.body.userId
	).name;
	group.news.push({
		user: req.user.id,
		text: `${username} has joined the group`,
		description: "Say Hi to the new member",
	});

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
	group = await Groups.findById(req.params.id)
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
		message: "You have left the group",
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
	group = await Groups.findById(req.params.id)
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
	res.status(200).json({
		success: true,
		message: "User blocked successfully",
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
	group = await Groups.findById(req.params.id)
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
	res.status(200).json({
		success: true,
		message: "User unblocked successfully",
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
	if (!group.members.includes(req.user.id)) {
		return next(new ErrorHandler(`You are not authorized to add posts`, 400));
	}
	if (typeof req.body.images !== "undefined") {
		let images = [];
		if (typeof req.body.images === "string") {
			images.push(req.body.images);
		} else {
			images = req.body.images;
		}

		let imagesLinks = [];

		for (let i = 0; i < images.length; i++) {
			const result = await cloudinary.uploader.upload(images[i], {
				folder: "posts",
			});

			imagesLinks.push({
				public_id: result.public_id,
				url: result.secure_url,
			});
		}

		req.body.images = imagesLinks;
	}
	req.body.isFromGroup = true;
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
		message: "Post added successfully",
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
		message: "Post deleted successfully",
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

		if (group.members.includes(req.user.id)) {
			return next(new ErrorHandler(`You are already a member of this group`));
		}
		if (group.blockedUsers.includes(req.user.id)) {
			return next(
				new ErrorHandler(`You are blocked by the admin of this group`)
			);
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
			message: `You are now a member of this group`,
			group,
		});
	}
);

//Rate a group => /api/v2/groups/:id/rate
exports.rateGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);

	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (group.ratings.length === 0) {
		group.ratings.push({
			user: req.user.id,
			rating: req.body.rating,
		});
	} else {
		for (let i = 0; i < group.ratings.length; i++) {
			if (group.ratings[i].user.equals(req.user.id)) {
				group.ratings[i].rating = req.body.rating;
				break;
			}
			if (i === group.ratings.length - 1) {
				group.ratings.push({
					user: req.user.id,
					rating: req.body.rating,
				});
			}
		}
	}

	group.news.push({
		user: req.user.id,
		title: `${req.user.name} rated the group`,
		description: `${req.user.name} rated the group ${group.name} with ${req.body.rating} stars`,
	});
	await group.save();
	group = await Groups.findById(req.params.id)
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
	return res.status(200).json({
		success: true,
		group,
	});
	res.status(200).json({
		success: true,
		group,
	});
});

// Delete a group => /api/v2/groups/:id
exports.deleteGroup = catchAsyncErrors(async (req, res, next) => {
	let group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	if (group.owner.toString() !== req.user.id) {
		return next(
			new ErrorHandler(
				`You are not authorized to delete this group ${group.name}`,
				401
			)
		);
	}
	await Post.deleteMany({ _id: { $in: group.posts } });
	await group.remove();
	res.status(200).json({
		success: true,
		message: `Group ${group.name} deleted successfully`,
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

// ADMIN

// Get all groups => /api/v2/admin/groups
exports.adminGetAllGroups = catchAsyncErrors(async (req, res, next) => {
	const groups = await Groups.find().populate("owner", "name");
	res.status(200).json({
		success: true,
		groups,
	});
});

// Delete a group => /api/v2/admin/groups/:id
exports.adminDeleteGroup = catchAsyncErrors(async (req, res, next) => {
	const group = await Groups.findById(req.params.id);
	if (!group) {
		return next(
			new ErrorHandler(`Group does not found with id: ${req.params.id}`, 404)
		);
	}
	await Post.deleteMany({ _id: { $in: group.posts } });
	await Comment.deleteMany({ post: { $in: group.posts } });
	await group.remove();
	res.status(200).json({
		success: true,
		message: "Group deleted successfully",
	});
});
