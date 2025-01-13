module.exports.config = {
	name: "uid",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "RDX ZAIN",
	description: "Command to get UID without using prefix",
	commandCategory: "USER UID NUMBER",
	cooldowns: 5
};

module.exports.run = async function({ event, api, args, client, Currencies, Users }) {
	const fs = global.nodemodule["fs-extra"];
	const request = global.nodemodule["request"];
	const axios = global.nodemodule['axios'];

	// Check if the message exactly matches "uid"
	if (event.body.toLowerCase() === "uid") {
		if (event.type == "message_reply") {
			let uid = event.messageReply.senderID;
			var callback = () => api.sendMessage({ body: `🌸✨ ${uid} ✨🌸`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID,
				() => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
			return request(encodeURI(`https://graph.facebook.com/${uid}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
		}

		if (!args[0]) {
			let uid = event.senderID;
			const res = await axios.get(`https://www.nguyenmanh.name.vn/api/fbInfo?id=${uid}&apikey=LV7LWgAp`);
			var callback = () => api.sendMessage({ body: `˚₊· ͟͟͞͞➳❥${uid}`, attachment: fs.createReadStream(__dirname + "/cache/1.png") }, event.threadID,
				() => fs.unlinkSync(__dirname + "/cache/1.png"), event.messageID);
			return request(encodeURI(`https://graph.facebook.com/${event.senderID}/picture?height=1500&width=1500&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
				.pipe(fs.createWriteStream(__dirname + '/cache/1.png'))
				.on('close', () => callback());
		}
	}
};
