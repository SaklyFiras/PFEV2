const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, message) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.EMAIL_HOST,
			port: process.env.EMAIL_PORT,
			service: process.env.EMAIL_SERVICE,
			secure: Boolean(process.env.EMAIL_SECURE),
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD,
			},
		});

		await transporter.sendMail({
			from: process.env.From_EMAIL,
			to: email,
			subject: subject,
			text: message,
		});
		console.log("Email sent");
	} catch (error) {
		console.log("Email not sent");
		console.log(error);
	}
};

module.exports = sendEmail;
