const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
	err.statusCode = err.statusCode || 500;
	if (process.env.NODE_env === "DEVELOPMENT") {
		res.status(err.statusCode).json({
			success: false,
			error: err,
			errMessage: err.message,
			stack: err.stack,
		});
	}
	if (process.env.NODE_env === "PRODUCTION") {
		let error = { ...err };
		error.message = err.message || "server error";
		//wrong mongoose Object ID error
		if (err.name == "CastError") {
			const message = `Resource not found .Invalid : `;
			error = new ErrorHandler(message, 400);
		}

		//handling mongoose validation error
		if ((err.name = "validationError")) {
			const message = Object.values(err.errors).map((value) => value.message);
			error = new ErrorHandler(message, 400);
		}
		//Handling Mongoose duplicate key error
		if (err.code === 11000) {
			const message = `Duplicate ${Object.keys(err.keyValue)} entred`;
			error = new ErrorHandler(message, 400);
		}
		//Handling wrong jwt error
		if ((err.name = "jsonWebTokenError")) {
			const message = "Json web token is invalid ,try again";
			error = new ErrorHandler(message, 400);
		}
		//handling expired jwt error
		if ((err.name = "TokenExpiredError")) {
			const message = "Json Web Token is expired";
			error = new ErrorHandler(message, 400);
		}
		

		res.status(error.statusCode).json({
			success: false,
			message: error.message || " server error",
		});
	}
};
