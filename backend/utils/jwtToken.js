//Create and send token and save in the cookie
const cookie = require("cookie-parser");

const sendToken = (user, statusCode, res) => {
	//create jwt token
	const token = user.getJwtToken();

	const options = {
		maxAge: 1000 * 60 * 60 * 24 * process.env.COOKIE_EXPIRES_TIME,
		httpOnly: true,
	};

	res.status(statusCode).cookie("token", token, options).json({
		success: true,
		token,
		user,
	});
};
module.exports = sendToken;
