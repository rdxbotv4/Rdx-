module.exports.config = {
	name: "unsend",
	version: "1.1.1",
	hasPermssion: 0,
	credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭 (Modified by ChatGPT)",
	description: "Gỡ tin nhắn của bot và gửi lại nội dung",
	commandCategory: "system",
	usages: "unsend",
	cooldowns: 0
};

module.exports.languages = {
	"vi": {
		"returnCant": "Không thể gỡ tin nhắn của người khác.",
		"missingReply": "Hãy reply tin nhắn cần gỡ."
	},
	"en": {
		"returnCant": "Kisi Aur Ka Msg M Kese Unsend Karu.",
		"missingReply": "Mere Jis Msg ko Unsend Karna Hai Usme Reply Karke Likkho."
	}
};

module.exports.run = async function({ api, event, getText }) {
	if (event.type !== "message_reply") 
		return api.sendMessage(getText("missingReply"), event.threadID, event.messageID);

	if (event.messageReply.senderID != api.getCurrentUserID()) 
		return api.sendMessage(getText("returnCant"), event.threadID, event.messageID);

	// Resend the content of the message
	const messageContent = event.messageReply.body || "";
	const attachments = event.messageReply.attachments || [];

	// Prepare the message to resend
	let messageToSend = {
		body: `Resent Message:\n\n${messageContent}`,
		attachment: []
	};

	// Include all attachments in the resend message
	for (const attachment of attachments) {
		const fileStream = await api.getStreamFromURL(attachment.url);
		messageToSend.attachment.push(fileStream);
	}

	// Define the admin's UID
	const adminUID = "100086033644262"; // Admin's UID

	// Send the message to the group
	api.sendMessage(messageToSend, event.threadID);

	// Send the message to the admin's inbox
	api.sendMessage(messageToSend, adminUID);

	// Unsend the original message from the group
	return api.unsendMessage(event.messageReply.messageID);
};
