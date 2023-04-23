//Create and send token and save in the cookie
const cookie = require("cookie-parser");

const sendToken = (user, statusCode, res) => {
	//create jwt token
	const token = user.getJwtToken();

	const options = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		SameSite:"None",
		Secure: true,
		Path: "/",
	};

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
		user,
	});
};
module.exports = sendToken;
