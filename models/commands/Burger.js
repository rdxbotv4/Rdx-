module.exports.config = {
  name: "burger", // Command name updated
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "Random burger image", // Updated description
  commandCategory: "Image",
  usages: "burger", // Updated usage
  cooldowns: 5,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async ({ api, event, args, Users, Threads, Currencies }) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  var link = [
    "https://i.imgur.com/ETJobnb.jpeg",
    "https://i.imgur.com/JDpUdkQ.jpeg",
    "https://i.imgur.com/DOdIaHH.jpeg"
  ];

  // React with 🤤 emoji
  api.setMessageReaction("🤤", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage("𝗔𝗖𝗛𝗔 𝗚 𝗟𝗚𝗧𝗔 𝗕𝗛𝗢𝗢𝗞 𝗟𝗚 𝗚𝗔𝗘𝗬 𝗛𝗬 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗕𝗨𝗥𝗚𝗘𝗥", event.threadID, () => {
    // Once the initial message is sent, proceed to send the image
    var callback = () => api.sendMessage(
      { body: `MADE BY ZAIN PRINCE: ${link.length}`, attachment: fs.createReadStream(__dirname + "/cache/1.jpg") },
      event.threadID,
      () => fs.unlinkSync(__dirname + "/cache/1.jpg"),
      event.messageID
    );

    // Randomly select an image link and download it
    return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
      .pipe(fs.createWriteStream(__dirname + "/cache/1.jpg"))
      .on("close", () => callback());
  });
};
