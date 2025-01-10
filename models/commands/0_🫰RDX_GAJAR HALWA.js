module.exports.config = {
  name: "GH", // Changed command name
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "Random joke image",
  commandCategory: "Image",
  usages: "GH",
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
    "https://i.postimg.cc/1tsYkq02/15ed3c7279028db942f4f34b0542803b.jpg",
"https://i.postimg.cc/50gkb2n0/5ab4bf2ed28cc010e44405b513bd6981.jpg",
" https://i.postimg.cc/hvGZjR50/e4f3f8b211a4d30dc00253c58c0e594c.jpg",
"https://i.postimg.cc/hv3yQ3FR/c0fc4f07f992aaa3a9499edee4e812bd.jpg"
  ];

  // React with 🤤 emoji
  api.setMessageReaction("🤤", event.messageID, (err) => {}, true);

  // Send the initial message
  api.sendMessage("𝗔𝗖𝗛𝗔 𝗚 𝗟𝗚𝗧𝗔 𝗕𝗛𝗢𝗢𝗞 𝗟𝗚 𝗚𝗔𝗘𝗬 𝗛𝗬 𝗝𝗡𝗔𝗕 𝗞𝗢 𝗗𝗘𝗧𝗔 𝗛𝗨 𝗚𝗔𝗝𝗔𝗥 𝗞𝗔 𝗛𝗔𝗟𝗪𝗔🤤🤤🤤", event.threadID, () => {
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
