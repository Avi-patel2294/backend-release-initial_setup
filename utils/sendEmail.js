const nodemailer = require('nodemailer');
const logger = require('../logger');
const {
	EMAIL_USER,
	EMAIL_PASSWORD,
	EMAIL_HOST,
	EMAIL_PORT,
} = require('../config');

const sendEmail = async (mailOptions) => {
	const transporter = nodemailer.createTransport({
		host: EMAIL_HOST,
		port: EMAIL_PORT,
		auth: {
			user: EMAIL_USER,
			pass: EMAIL_PASSWORD,
		},
	});
	try {
		await transporter.sendMail(mailOptions);
	} catch (err) {
		logger.error(`utils:sendEmail:: Error Sending Email`, err);
	}
};

module.exports = sendEmail;
