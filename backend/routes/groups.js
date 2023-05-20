const express = require("express");
const router = express.Router();

const {
	newGroup,
	getGroup,
	getGroups,
	deleteGroup,
	leaveGroup,
	getGroupMembers,
	getGroupPosts,
	sendRequestToJoinGroup,
	acceptRequestToJoinGroup,
	declineRequestToJoinGroup,
	getGroupBlockedUsers,
	blockUserFromGroup,
	unblockUserFromGroup,
	addPostToGroup,
	deletePostFromGroup,
	getGroupNews,
	joinGroupWithNameAndPassword,
	rateGroup,
	adminGetAllGroups,
	adminDeleteGroup,
	
} = require("../controllers/groupsController");

const { isAuthenticatedUser,authorizeRoles } = require("../middlewares/auth");
//Fetching Functionalities
router.route("/groups").get(isAuthenticatedUser, getGroups);
router.route("/group/:id").get(isAuthenticatedUser, getGroup);
router.route("/group/members/:id").get(getGroupMembers);
router.route("/group/news/:id").get(getGroupNews);

//Manage Group Functionalities
router.route("/group/new").post(isAuthenticatedUser, newGroup);

router.route("/group/delete/:id").delete(isAuthenticatedUser, deleteGroup);
//Join Functionalities
router
	.route("/group/join/:id")
	.put(isAuthenticatedUser, sendRequestToJoinGroup);

router
	.route("/group/join/direct")
	.post(isAuthenticatedUser, joinGroupWithNameAndPassword);
router
	.route("/group/requests/accept/:id")
	.put(isAuthenticatedUser, acceptRequestToJoinGroup);

router
	.route("/group/requests/decline/:id")
	.put(isAuthenticatedUser, declineRequestToJoinGroup);

// Post functionalities
router.route("/group/post/:id").post(isAuthenticatedUser, addPostToGroup);
router
	.route("/group/post/:id")
	.delete(isAuthenticatedUser, deletePostFromGroup);
router.route("/group/posts/:id").get(getGroupPosts);
router.route("/group/rate/:id").put(isAuthenticatedUser, rateGroup);
// Block functionalities
router.route("/group/blockedUsers/:id").get(getGroupBlockedUsers);
router
	.route("/group/blockUser/:id")
	.put(isAuthenticatedUser, blockUserFromGroup);
router
	.route("/group/unblockUser/:id")
	.put(isAuthenticatedUser, unblockUserFromGroup);

router.route("/group/leave/:id").put(isAuthenticatedUser, leaveGroup);


//Admin Functionalities
router.route("/admin/groups").get(isAuthenticatedUser,authorizeRoles('admin'), adminGetAllGroups);
router.route("/admin/group/delete/:id").delete(isAuthenticatedUser,authorizeRoles('admin'), adminDeleteGroup);

module.exports = router;
