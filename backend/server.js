const app = require("./app");
const dataBaseConnect = require("./config/database");

const cloudinary = require("cloudinary").v2;

//Handle Uncaught Exceptions
process.on("uncaughtException", (err) => {
	console.log(`ERROR : ${err.message}`);
	console.log("Shutting Down due to Unhandled Exception");

	process.exit(1);
});

// Setting up config file
// if (process.env.NODE_ENV !== "PRODUCTION")
	require("dotenv").config({ path: "backend/config/config.env" });

dataBaseConnect();

//cloudinary config
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

const server = app.listen(process.env.PORT, () => {
	console.log(
		`listening on port ${process.env.PORT} in ${process.env.NODE_ENV} mode`
	);
});

//Handle Unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`ERROR : ${err.message}`);
	console.log("Shutting Down Server due to Unhandled promise rejection");
	server.close(() => {
		process.exit(1);
	});
});
