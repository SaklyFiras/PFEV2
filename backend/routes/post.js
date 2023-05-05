const express = require("express");
const router = express.Router();

const {
	newPost,
	deletePost,
	getPosts,
	getPostDetails,
	updatePost,
	getUserPosts,
	adminDeletePost,
	likePost,
	adminGetAllPosts,
} = require("../controllers/postController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/post/new").post(isAuthenticatedUser, newPost);
router.route("/posts").get(isAuthenticatedUser, getPosts);
router.route("/:id/posts").get(isAuthenticatedUser, getUserPosts);
router
	.route("/post/:id")
	.delete(isAuthenticatedUser, deletePost)
	.get(isAuthenticatedUser, getPostDetails)
	.put(isAuthenticatedUser, updatePost);
router.delete(
	"/admin/post/:id",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	adminDeletePost
);

router.get(
	"/allposts",
	isAuthenticatedUser,
	authorizeRoles("admin"),
	adminGetAllPosts
);

router.route("/post/like/:id").put(isAuthenticatedUser, likePost);

module.exports = router;
