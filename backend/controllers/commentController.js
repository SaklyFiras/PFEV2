const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Comment = require("../models/comment");
const Post = require("../models/Post");
const User = require("../models/user");

// Create a new comment => /api/v2/comment/new/:id
module.exports.newComment = catchAsyncErrors(async (req, res, next) => {
	const { content, commentType } = req.body;

	const comment = await Comment.create({
		content,
		post: req.params.id,
		commentType,
		user: req.user.id,
		createdAt: Date.now(),
	});
	await Post.updateOne(
		{ _id: req.params.id },
		{ $push: { comments: comment._id } }
	);

	res.status(201).json({
		success: true,
		comment,
	});
});

// Delete comment => /api/v2/comment/:id
module.exports.deleteComment = catchAsyncErrors(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);
	if (!comment) {
		return next(
			new ErrorHandler(`Comment does not found with id: ${req.params.id}`)
		);
	}
	const user = await User.findById(req.user.id);
	if (user.id !== comment.user.toString()) {
		return next(
			new ErrorHandler(`You are not authorized to delete this comment`, 401)
		);
	}
	await Post.findByIdAndUpdate(
		{ _id: comment.post },
		{ $pull: { comments: req.params.id } }
	);
	comment.remove();
	res.status(200).json({
		success: true,
		message: "Comment is deleted.",
	});
});

// Edit comment => /api/v2/comment/:id
module.exports.editComment = catchAsyncErrors(async (req, res, next) => {
	const comment = await Comment.findById(req.body.id);
	if (!comment) {
		return next(
			new ErrorHandler(`Comment does not found with id: ${req.body.id}`)
		);
	}
	const user = await User.findById(req.user.id);
	if (user.id !== comment.user.toString()) {
		return next(
			new ErrorHandler(`You are not authorized to edit this comment`, 401)
		);
	}
	comment.updatedAt = Date.now();
	comment.content = req.body.content;
	comment.save();
	res.status(200).json({
		success: true,
		message: "Comment is edited.",
	});
});

// Like comment => /api/v2/comment/like/:id
module.exports.likeComment = catchAsyncErrors(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);
	if (!comment) {
		return next(
			new ErrorHandler(`Comment does not found with id: ${req.params.id}`)
		);
	}
	const user = await User.findById(req.user.id);

	if (comment.likes.includes(user.id)) {
		await Comment.updateOne(
			{ _id: req.params.id },
			{ $pull: { likes: user.id } }
		);
		res.status(200).json({
			success: true,
			message: "Comment is unliked.",
		});
		return;
	}

	if (comment.dislikes.includes(user.id)) {
		await Comment.updateOne(
			{ _id: req.params.id },
			{ $pull: { dislikes: user.id } }
		);
		res.status(200).json({
			success: true,
			message: "Comment is disliked.",
		});
		return;
	}

	await Comment.updateOne(
		{ _id: req.params.id },
		{ $push: { likes: user.id } }
	);
	res.status(200).json({
		success: true,
		message: "Comment is liked.",
	});
});

// dislike comment => /api/v2/comment/dislike/:id
module.exports.dislikeComment = catchAsyncErrors(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);
	if (!comment) {
		return next(
			new ErrorHandler(`Comment does not found with id: ${req.params.id}`)
		);
	}
	const user = await User.findById(req.user.id);
	if (comment.dislikes.includes(user.id)) {
		await Comment.updateOne(
			{ _id: req.params.id },
			{ $pull: { dislikes: user.id } }
		);
		res.status(200).json({
			success: true,
			message: "Comment is undisliked.",
		});
		return;
	}
	if (comment.likes.includes(user.id)) {
		await Comment.updateOne(
			{ _id: req.params.id },
			{ $pull: { likes: user.id } }
		);
		res.status(200).json({
			success: true,
			message: "Comment is unliked.",
		});
		return;
	}
	await Comment.updateOne(
		{ _id: req.params.id },
		{ $push: { dislikes: user.id } }
	);
	res.status(200).json({
		success: true,
		message: "Comment is disliked.",
	});
});

// Additionel features :

// Get all comments => /api/v2/comments
module.exports.getComments = catchAsyncErrors(async (req, res, next) => {
	const comments = await Comment.find();
	res.status(200).json({
		success: true,
		comments,
	});
});

// Get single comment => /api/v2/comment/:id
module.exports.getComment = catchAsyncErrors(async (req, res, next) => {
	const comment = await Comment.findById(req.params.id);
	if (!comment) {
		return next(
			new ErrorHandler(`Comment does not found with id: ${req.params.id}`)
		);
	}
	res.status(200).json({
		success: true,
		comment,
	});
});

// Get all comments of a post => /api/v2/comments/:id
module.exports.getCommentsOfPost = catchAsyncErrors(async (req, res, next) => {
	const comments = await Comment.find({ post: req.params.id })
		.populate("user", "name avatar")
		.populate("likes", "name")
		.populate("dislikes", "name");
	res.status(200).json({
		success: true,
		comments,
	});
});

// Get all comments of a user => /api/v2/comments/user/:id
module.exports.getCommentsOfUser = catchAsyncErrors(async (req, res, next) => {
	const comments = await Comment.find({ user: req.params.id });
	res.status(200).json({
		success: true,
		comments,
	});
});
