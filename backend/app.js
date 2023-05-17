const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

const errorMiddleware = require("./middlewares/errors");
if (process.env.NODE_ENV !== "PRODUCTION")
	require("dotenv").config({ path: "backend/config/config.env" });

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(fileUpload());

//import cors : Temporary solution
const cors = require("cors");
app.use(
	cors({
		origin:
			process.env.NODE_ENV !== "PRODUCTION"
				? ["http://localhost:4000"]
				: process.env.ONLINE_URL,
		credentials: true,
	})
);
//import routes
const user = require("./routes/user");
const post = require("./routes/post");
const comment = require("./routes/comment");
const groups = require("./routes/groups");

app.use("/api/v2", user);
app.use("/api/v2", post);
app.use("/api/v2", comment);
app.use("/api/v2", groups);

//handling error
app.use(errorMiddleware);

if (process.env.NODE_ENV === "PRODUCTION") {
	app.use(express.static(path.join(__dirname, "../frontend/build")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
	});
}

module.exports = app;
