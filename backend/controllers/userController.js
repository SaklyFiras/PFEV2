const User = require("../models/user");
const sendEmail = require("../utils/sendEmail");
const Token = require("../models/token");
const crypto = require("crypto");
const bcryptjs = require("bcryptjs");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const cloudinary = require("cloudinary").v2;

//Register a user => /api/v2/register

exports.registerUser = catchAsyncErrors(async (req, res, next) => {
	const { name, email, password, status, birthDate } = req.body;
	//Check if email already exists
	const _user = await User.findOne({ email: req.body.email });

	if (_user) {
		try {
			const _token = await Token.findOne({ userId: _user._id });
			if (_user.verified) {
				return next(new ErrorHandler("Email already exists", 400));
			} else {
				if (_token) {
					return next(
						new ErrorHandler("an attempt was already made,wait one hour", 400)
					);
				} else {
					_user.remove();
					return next(new ErrorHandler("try again", 400));
				}
			}
		} catch (error) {
			console.log(error);
			return next(new ErrorHandler("Internal server error", 400));
		}
	}
	// set user avatar
	const user = await User.create({
		name,
		email,
		password,
		status,
		birthDate,
		avatar: {
			public_id: "avatars/dahms721bscexxpx2njo",
			url: "https://res.cloudinary.com/dnbgbo6bi/image/upload/v1679254496/avatars/dahms721bscexxpx2njo.png",
		},
		role: "user",
		skills: ["no skills yet"],
	});
	//send email verification => /api/v2/:user_id/verify/:token

	const token = await new Token({
		userId: user._id,
		token: crypto.randomBytes(16).toString("hex"),
	}).save();
	const url = `${process.env.ONLINE_URL}/${user._id}/verify/${token.token}`;
	try {
		await sendEmail(
			user.email,
			"Dentist-UP Email Verification",
			`Please click on the link to verify your email: ${url}`
		);
	} catch (error) {
		console.log(error);
		return next(new ErrorHandler("Email could not be sent", 500));
	}

	res.status(200).json({
		success: true,
		message:
			"Email sent to your email, please verify your email to complete your registration",
	});
});
//Verify email => /api/v2/:user_id/verify/:token
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.user_id);
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	const token = await Token.findOne({
		userId: user._id,
		token: req.params.token,
	});
	if (!token) {
		return next(new ErrorHandler("Invalid token", 400));
	}
	user.verified = true;
	await user.save();
	await token.remove();
	sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v2/password/forgot
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findOne({ email: req.body.email });

	if (!user) {
		return next(new ErrorHandler("User not found with this email", 404));
	}

	// Get reset token
	const resetToken = user.getResetPasswordToken();

	await user.save({ validateBeforeSave: false });

	// Create reset password url
	const resetUrl = `${process.env.ONLINE_URL}/password/reset/${resetToken}`;

	const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

	try {
		await sendEmail(user.email, "Dentist-UP Password Recovery", message);

		res.status(200).json({
			success: true,
			message: `Email sent to: ${user.email}`,
		});
	} catch (error) {
		user.resetPasswordToken = undefined;
		user.resetPasswordExpire = undefined;

		await user.save({ validateBeforeSave: false });

		return next(new ErrorHandler(error.message, 500));
	}
});

// Reset Password   =>  /api/v2/password/reset/:token
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
	const resetPasswordToken = crypto
		.createHash("sha256")
		.update(req.params.token)
		.digest("hex");
	const user = await User.findOne({
		resetPasswordToken,
		resetPasswordExpire: { $gt: Date.now() },
	});
	if (!user) {
		return next(
			new ErrorHandler(
				"Password reset token is invalid or has been expired",
				400
			)
		);
	}
	if (req.body.password !== req.body.confirmPassword) {
		return next(new ErrorHandler("Password does not match", 400));
	}
	//Setup new password
	user.password = req.body.password;
	user.resetPasswordToken = undefined;
	user.resetPasswordExpire = undefined;
	await user.save();
	res.status(201).json({
		success: true,
		message: "Password updated successfully",
	});
});

// Login user => /api/v1/login

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
	const { email, password } = req.body;
	//checks if email and password is entered by user

	if (!email || !password) {
		return next(new ErrorHandler("Please enter email & password", 400));
	}
	//Finding user in database
	let user = await User.findOne({ email }).select("+password");
	if (!user) {
		return next(new ErrorHandler("Invalid Email & password"), 401);
	}
	//Checks if password is correct or not
	const isPasswordMatched = await user.comparePassword(password);
	if (!isPasswordMatched) {
		return next(new ErrorHandler("Invalid Email & password"), 401);
	}
	//checking if the user has verified his email
	if (!user.verified) {
		let token = await Token.findOne({ userId: user._id });
		if (!token) {
			token = await new Token({
				userId: user._id,
				token: crypto.randomBytes(16).toString("hex"),
			}).save();
		}
		const url = `${process.env.ONLINE_URL}
			/${user._id}/verify/${token.token}`;
		await sendEmail(
			user.email,
			"Dentist-UP Email Verification",
			`Please click on the link to verify your email: ${url}`
		);
		return next(new ErrorHandler("Please verify your email", 401));
	}
	if (user.deletedAt !== null) {
		await user.updateOne({ deletedAt: null });
	}

	user.password = undefined;
	sendToken(user, 200, res);
});

// Get currently logged in user details   =>   /api/v2/me
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	res.status(200).json({
		success: true,
		user,
	});
});

// change password => /api/v2/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id).select("+password");
	//check previous user password
	const isMatched = await user.comparePassword(req.body.oldpassword);
	if (!isMatched) {
		return next(new ErrorHandler("old password is incorrect", 400));
	}
	user.password = req.body.password;
	await user.save();
	sendToken(user, 200, res);
});

//update user profile => /api/v2/me/update
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
	const newUserData = req.body;
	if (
		typeof newUserData.verified !== "undefined" ||
		typeof newUserData.createdAt !== "undefined"
	) {
		return next(new ErrorHandler("prohibited action", 400));
	}

	//update avatar
	if (req.body.avatar) {
		if (req.body.avatar !== "") {
			const user = await User.findById(req.user.id);

			const image_id = user.avatar.public_id;
			if (image_id !== "avatars/dahms721bscexxpx2njo") {
				await cloudinary.uploader.destroy(image_id);
			}
			const result = await cloudinary.uploader.upload(req.body.avatar, {
				folder: "avatars",
				width: 150,
				crop: "scale",
			});

			newUserData.avatar = {
				public_id: result.public_id,
				url: result.secure_url,
			};
		}
	}

	//update user
	const user = await User.findOneAndUpdate({ _id: req.user.id }, newUserData, {
		new: true,
		runValidators: true,
		useFindAndModify: false,
	});
	res.status(200).json({
		newUserData,
		success: true,
		message: "Profile updated successfully",
		user,
	});
});
// Logout user   =>   /api/v1/logout
exports.logout = catchAsyncErrors(async (req, res, next) => {
	res.cookie("token", null, {
		expires: -1,
		httpOnly: true,
	});

	res.status(200).json({
		success: true,
		message: "Logged out",
	});
});
// delete user => /api/v2/me/delete
exports.deleteAuth = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	if (!user) {
		return next(new ErrorHandler("User not found", 404));
	}
	await User.updateOne(
		{ _id: req.user.id },
		{ deletedAt: Date.now() + 2592000000 }
	);

	res.status(200).json({
		success: true,
		message:
			"Account will be deleted in 30 days, you can restore it anytime by logging in",
	});
});
// Get user details   =>   /api/v1/admin/user/:id
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`User does not found with id: ${req.params.id}`)
		);
	}
	res.status(200).json({
		success: true,
		user,
	});
});
// Admin Routes
// Get all users   =>   /api/v1/admin/users
exports.allUsers = catchAsyncErrors(async (req, res, next) => {
	const users = await User.find();
	res.status(200).json({
		success: true,
		users,
	});
});

// Delete user   =>   /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
	const user = await User.findById(req.params.id);
	if (!user) {
		return next(
			new ErrorHandler(`User does not found with id: ${req.params.id}`)
		);
	}
	//Remove avatar from cloudinary
	if (user.avatar.public_id !== "avatars/dahms721bscexxpx2njo") {
		const image_id = user.avatar.public_id;
		await cloudinary.uploader.destroy(image_id);
	}
	//Remove user
	await user.remove();
	res.status(200).json({
		success: true,
		message: "User deleted successfully",
	});
});
