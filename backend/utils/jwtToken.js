//Create and send token and save in the cookie
const cookie = require("cookie-parser");

const sendToken = (user, statusCode, res) => {
	//create jwt token
	const token = user.getJwtToken();

	
	

	res.status(statusCode).cookie("token", token).json({
		success: true,
		token,
		user,
	});
};
module.exports = sendToken;
