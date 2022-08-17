const Message = require("../model/message");
const path = require("path");
const chalk = require("chalk");
// const userList = require("../controllers/userList");
require("dotenv").config({ path: path.join(__dirname, "../config.env") });

const sendingMessage = async (chat, socket, messages) => {
	const { to, from, file, message } = messages;
	if (!to || !from) {
		console.log(
			chalk.bgRed("[chat] Missing sender or receiver in chat message;")
		);
		socket.emit("error", "Missing sender or receiver in chat message");
		return;
	}
	if (!message && !file) {
		console.log(chalk.bgRed("[chat] Missing both message and file in chat"));
		socket.emit("error", "Missing both message and file in chat");
		return;
	}
	messages.from = socket.userID;
	const newMessage = new Message(messages);
	try {
		const messageResp = await newMessage.save();
		const { to, from, time } = messageResp;
		console.log(
			chalk.bgGreen(
				" [chat] SAVED [",
				"to: " + to,
				"| from: " + from,
				"| at: " + time + "] "
			)
		);
		console.log(
			message.length < 100
				? chalk.inverse(message)
				: chalk.inverse(message.substr(0, 100) + "...  ")
		);

		chat.to(from).emit("set-time", { user: from, other: to });
		chat.to(to).emit("set-time", { user: to, other: from });

		if (!messageResp.inGroup) {
			socket.emit("getting-message", messageResp);
		}
		chat.to(messageResp.to).emit("getting-message", messageResp);
		// userList(chat);
		return;
	} catch (error) {
		console.log(error.message);
		socket.emit("error", error.message);
		// userList(chat);
		return;
	}
};
module.exports = sendingMessage;
