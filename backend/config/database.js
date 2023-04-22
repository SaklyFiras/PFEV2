const mongoose = require("mongoose");

const mongooseDataBase = () => {
	mongoose
		.connect(
			process.env.NODE_ENV !== "PRODUCTION"
				? process.env.DB_LOCAL_URL
				: process.env.DB_URI
		)
		.then((con) => {
			console.log(`mongoDb connected with HOST : ${con.connection.host}`);
		});
};

module.exports = mongooseDataBase;
