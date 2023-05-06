const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please enter your name"],
		maxlength: [30, "Your name cannot exceed 30 characters"],
		minlength: 3,
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		validator: [validator.isEmail, "Please enter valid email adress"],
	},
	password: {
		type: String,
		required: [true, "Please enter password"],
		minlength: [3, "Your password must be longer than 3 charcaters"],
		maxlength: [40, "Your password cannot exceed 40 characters"],
		select: false,
	},
	avatar: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
	},
	education: [
		{
			current: {
				type: Boolean,
				default: false,
			},
			degree: {
				type: String,
				default: "",
				// required: [true, "Please enter your degree"],
			},
			school: {
				type: String,
				default: "",
				// required: [true, "Please enter your school"],
			},
			startDate: {
				type: Date,
				default: undefined,
				// required: [true, "Please enter your start date"],
			},
			endDate: {
				type: Date,
				default: undefined,
				// required: [true, "Please enter your end date"],
			},
			description: {
				type: String,
				default: "",
				// required: [true, "Please enter your description"],
			},
		},
	],
	bio: {
		type: String,
		default: "",
	},
	experience: [
		{
			current: {
				type: Boolean,
				default: false,
			},
			title: {
				type: String,
				default: "",
				// required: [true, "Please enter your title"],
			},
			company: {
				type: String,
				default: "",
				// required: [true, "Please enter your company"],
			},
			startDate: {
				type: Date,
				default: undefined,
				// required: [true, "Please enter your start date"],
			},
			endDate: {
				type: Date,
				default: undefined,
				// required: [true, "Please enter your end date"],
			},
			description: {
				type: String,
				default: "",
				// required: [true, "Please enter your description"],
			},
			location: {
				type: String,
				default: "",
				// required: [true, "Please enter your location"],
			},
		},
	],
	location: {
		type: String,
		default: "",
		// required: [true, "Please enter your location"],
	},
	githubUsername: {
		type: String,
		default: "",
	},
	social: {
		facebook: {
			type: String,
			default: "facebook",
		},
		twitter: {
			type: String,
			default: "twitter",
		},
		linkedin: {
			type: String,
			default: "linkedin",
		},
		instagram: {
			type: String,
			default: "instagram",
		},
		youtube: {
			type: String,
			default: "youtube",
		},
	},
	speciality: {
		type: String,
		default: "",
	},
	website: {
		type: String,
		default: "https://",
	},
	phone: {
		type: Number,
		default: 99999999,
		length: 8,
	},

	skills: [
		{
			type: String,
			default: "",
		},
	],
	birthDate: {
		type: Date,
		required: [true, "Please enter your birth date"],
	},

	status: {
		type: String,
		enum: {
			values: ["Student", "Professor", "Dentist", "Expert"],
			message: "status is either: Student, Professor, Dentist or Expert",
		},
		required: true,
	},
	role: {
		type: String,
		enum: {
			values: ["user", "admin"],
			message: "role is either: user or admin",
		},
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	verified: {
		type: Boolean,
		default: false,
	},
	deletedAt: {
		type: Date,
		default: null,
		index: { expireAfterSeconds: 0 },
	},
	followers: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	],
	following: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
		},
	],
});
//Encrypting password before saving user

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		next();
	}

	this.password = await bcrypt.hash(this.password, 10);
});
//compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
};

//Retun jWT token
userSchema.methods.getJwtToken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_TIME,
	});
};
//generate password reset token

userSchema.methods.getResetPasswordToken = function () {
	//generate token
	const resetToken = crypto.randomBytes(20).toString("hex");

	//hash and set to resetPasswordToken
	this.resetPasswordToken = crypto
		.createHash("sha256")
		.update(resetToken)
		.digest("hex");

	//set token expire time
	this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

	return resetToken;
};

// function validatePassword(password) {
// 	// Check if password has at least 10 characters
// 	if (password.length < 10) {
// 		return false;
// 	}

// 	// Check if password has at least 3 numbers
// 	var numCount = 0;
// 	for (var i = 0; i < password.length; i++) {
// 		if (!isNaN(password[i])) {
// 			numCount++;
// 		}
// 	}
// 	if (numCount < 3) {
// 		return false;
// 	}

// 	// Check if password has at least one uppercase letter
// 	var upperCount = 0;
// 	for (var j = 0; j < password.length; j++) {
// 		if (password[j] === password[j].toUpperCase()) {
// 			upperCount++;
// 		}
// 	}
// 	if (upperCount < 1) {
// 		return false;
// 	}

// 	// Password is valid
// 	return true;
// }

module.exports = mongoose.model("User", userSchema);
