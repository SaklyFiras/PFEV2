const express = require("express");
const router = express.Router();

const {
	newComment,
	deleteComment,
	editComment,
	likeComment,
	getCommentsOfPost,
	dislikeComment,

} = require("../controllers/commentController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/comment/new/:id").post(isAuthenticatedUser, newComment);
router
	.route("/comment/:id")
	.delete(isAuthenticatedUser, deleteComment)
	.put(isAuthenticatedUser, editComment);

router.route("/comment/like/:id").put(isAuthenticatedUser, likeComment);

router.route("/comment/dislike/:id").put(isAuthenticatedUser, dislikeComment);

router.route("/comments/:id").get(isAuthenticatedUser, getCommentsOfPost);



module.exports = router;
