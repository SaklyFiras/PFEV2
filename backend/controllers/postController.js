const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const Post = require("../models/Post");
const Comment = require("../models/comment");
const User = require("../models/user");
const cloudinary = require("cloudinary").v2;
const APIFeatures = require("../utils/apiFeatures");
const { ObjectId } = require("mongodb");

// Create a new post => /api/v2/post/new
exports.newPost = catchAsyncErrors(async (req, res, next) => {
	// images
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

	req.body.user = req.user.id;

	const post = await Post.create(req.body);

	res.status(201).json({
		success: true,
		post,
	});
});

// Delete Post => /api/v2/post/:id
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return next(
			new ErrorHandler(`Post does not found with id: ${req.params.id}`)
		);
	}
	// Deleting images associated with the product
	for (let i = 0; i < post.images.length; i++) {
		const result = await cloudinary.uploader.destroy(post.images[i].public_id);
	}
	const user = await User.findById(req.user.id);

	if (user._id != post.user.toString()) {
		return next(
			new ErrorHandler(`You are not authorized to delete this post`, 401)
		);
	}

	// Deleting images associated with the product
	for (let i = 0; i < post.images.length; i++) {
		const result = await cloudinary.uploader.destroy(post.images[i].public_id);
	}
	await Comment.deleteMany({ post: req.params.id });
	await post.remove();
	res.status(200).json({
		success: true,
		message: "Post is deleted.",
	});
});

// Get all posts => /api/v2/posts
exports.getPosts = catchAsyncErrors(async (req, res, next) => {
	const filter = req.query.filter;
	const keyword = req.query.keyword;

	const resPerPage = 6;
	const postsCount = await Post.countDocuments();

	let posts = await Post.find()
		.populate("user", "name avatar")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				select: "name avatar",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "dislikes",
				select: "name",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "likes",
				select: "name",
			},
		})
		.populate("likes", "name");

	if (filter === "date") {
		posts = posts.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
	}
	if (filter === "likes") {
		posts = posts.sort((a, b) => {
			return b.likes.length - a.likes.length;
		});
	}
	
	if (keyword) {
		posts = posts.filter((post) => {
			return post.postInfo.title.toLowerCase().includes(keyword.toLowerCase());
		});
	}

	const currentPage = Number(req.query.page) || 1;
	const skip = resPerPage * (currentPage - 1);

	posts = posts.slice(skip).slice(0, resPerPage);

	res.status(200).json({
		success: true,
		postsCount,
		resPerPage,
		posts,
	});
});

// Get single post details => /api/v2/post/:id
exports.getPostDetails = catchAsyncErrors(async (req, res, next) => {
	const post = await Post.findById(req.params.id)
		.populate("user", "name avatar")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				select: "name avatar",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "dislikes",
				select: "name",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "likes",
				select: "name",
			},
		})
		.populate("likes", "name");
	if (!post) {
		return next(
			new ErrorHandler(`Post does not found with id: ${req.params.id}`)
		);
	}
	res.status(200).json({
		success: true,
		post,
	});
});

// Update post => /api/v2/post/:id
exports.updatePost = catchAsyncErrors(async (req, res, next) => {
	let post = await Post.findById(req.params.id);
	if (!post) {
		return next(
			new ErrorHandler(`Post does not found with id: ${req.params.id}`)
		);
	}
	const user = await User.findById(req.user.id);
	if (user.id !== post.user.toString()) {
		return next(
			new ErrorHandler(`You are not authorized to edit this post`, 401)
		);
	}
	if (req.body.images) {
		let images = [];
		if (typeof req.body.images === "string") {
			images.push(req.body.images);
		} else {
			images = req.body.images;
		}

		if (images !== undefined) {
			// Deleting images associated with the product
			for (let i = 0; i < product.images.length; i++) {
				const result = await cloudinary.uploader.destroy(
					product.images[i].public_id
				);
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
	}

	post = await Post.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		success: true,
		post,
	});
});

// Like post => /api/v2/post/like/:id
exports.likePost = catchAsyncErrors(async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return next(
			new ErrorHandler(`Post does not found with id: ${req.params.id}`)
		);
	}
	if (post.likes.includes(req.user.id)) {
		await Post.updateOne(
			{ _id: req.params.id },
			{ $pull: { likes: req.user.id } }
		);
		res.status(200).json({
			success: true,
			message: "Post has been unliked",
		});
		return;
	}
	await Post.updateOne(
		{ _id: req.params.id },
		{ $push: { likes: req.user.id } }
	);
	res.status(200).json({
		success: true,
		message: "Post has been liked",
	});
});

//Get user Posts => /api/v2/posts/me

exports.getUserPosts = catchAsyncErrors(async (req, res, next) => {
	const resPerPage = 3;
	const postsCount = await Post.countDocuments();

	let posts = await Post.find({ user: req.params.id })
		.populate("user", "name avatar")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				select: "name avatar",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "dislikes",
				select: "name",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "likes",
				select: "name",
			},
		})
		.populate("likes", "name");

	const currentPage = Number(req.query.page) || 1;
	const skip = resPerPage * (currentPage - 1);

	posts = posts.slice(skip, skip + resPerPage);

	res.status(200).json({
		success: true,
		postsCount,
		resPerPage,
		posts,
	});
});

//ADMIN ROUTES

// Get all posts => /api/v2/admin/posts
exports.adminGetAllPosts = catchAsyncErrors(async (req, res, next) => {
	const posts = await Post.find()
		.populate("user", "name avatar")
		.populate({
			path: "comments",
			populate: {
				path: "user",
				select: "name avatar",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "dislikes",
				select: "name",
			},
		})
		.populate({
			path: "comments",
			populate: {
				path: "likes",
				select: "name",
			},
		})
		.populate("likes", "name");
	res.status(200).json({
		success: true,
		posts,
	});
});

// delete post => /api/v2/admin/post/:id
exports.adminDeletePost = catchAsyncErrors(async (req, res, next) => {
	const post = await Post.findById(req.params.id);
	if (!post) {
		return next(
			new ErrorHandler(`Post does not found with id: ${req.params.id}`)
		);
	}

	// Deleting images associated with the product
	if (post.images !== undefined) {
		for (let i = 0; i < post.images.length; i++) {
			const result = await cloudinary.uploader.destroy(
				post.images[i].public_id
			);
		}
	}
	await Comment.deleteMany({ post: req.params.id });
	await post.remove();
	res.status(200).json({
		success: true,
		message: "Post is deleted.",
	});
});
