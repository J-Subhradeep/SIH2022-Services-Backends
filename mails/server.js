import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "./config.env" });
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import morgan from "morgan";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

let transporter = nodemailer.createTransport({
	host: "smtp.office365.com",
	port: 587,
	secure: false,
	encryption: "STARTTLS",
	auth: {
		user: process.env.TRANSPORT_USER,
		pass: process.env.TRANSPORT_PASSWORD,
	},
	tls: {
		rejectUnauthorized: true,
	},
});

app.get("/", (req, res) => {
	res.send("home sweet home");
});

app.post("/sendEmail", (req, res) => {
	const { message, email } = req.body;
	// message = JSON.parse(message);
	var msg = JSON.parse(message);
	let mailBody = `
    <h2>${msg.heading}</h2>
    <p>${msg.body}</p>`;

	let mailOptions = {
		from: `GleeGo <${process.env.TRANSPORT_USER}>`,
		to: email,
		subject: msg.subject,
		html: mailBody,
		replyTo: `GleeGo <${process.env.TRANSPORT_USER}>`,
	};

	transporter.sendMail(mailOptions, (err, info) => {
		if (err) return console.error(err);
		console.log(info);
		if (info.rejected.length === 0) res.send("Email sent");
	});
});

app.listen(PORT, (err) => {
	if (err) console.log(err);
	console.log(`Server running at http://localhost:${PORT}`);
});

/**
 * Demo request body json
 * {
        "email": "notanarbiter@gmail.com",
        "message": {
            "heading": "",
            "subject": "Email Verification Code",
            "body": "Hello user, this is your one time password to verify your email. It's <b>391248</b>. Enter this code to verify and continue to use our services.<br> Thank you"
        }
    }
 */
