const express = require("express");
const router = express.Router();
const {
	registerUser,
	loginUser,
	logout,
	forgotPassword,
	resetPassword,
	getUserProfile,
	updatePassword,
	updateProfile,
	allUsers,
	getUserDetails,
	verifyEmail,
	deleteUser,
	deleteAuth,
	addFollow
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

//user routes
router.route("/register").post(registerUser);
router.route("/:user_id/verify/:token").get(verifyEmail);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserProfile);
router.route("/follow/:id").put(isAuthenticatedUser, addFollow);


router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/me/delete").put(isAuthenticatedUser, deleteAuth);
router.route("/user/:id").get(isAuthenticatedUser, getUserDetails);

//admin routes
router
	.route("/admin/users")
	.get(isAuthenticatedUser, authorizeRoles("admin"), allUsers);
router
	.route("/admin/user/:id")

	.delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
module.exports = router;
