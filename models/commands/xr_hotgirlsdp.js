/** dont change credits please **/
module.exports.config = {
  name: "hotdp",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "ARIF BABU",
  description: "Boys DP photos",
  commandCategory: "Random-IMG",
  usages: "hot",
  cooldowns: 2,
  dependencies: {
    "request": "",
    "fs-extra": "",
    "axios": ""
  }
};

module.exports.run = async({api, event, args, Users, Threads, Currencies}) => {
  const axios = global.nodemodule["axios"];
  const request = global.nodemodule["request"];
  const fs = global.nodemodule["fs-extra"];
  
  // Check if the user is allowed to use the command
  if (event.senderID !== '100086033644262') {
    return api.sendMessage("📑 Ye command 📝 Sirf Mere Øwner Q͜͡U͜͡D͜͡U͜͡S͜͡ Ko Hi Allow Hai ✋", event.threadID);
  }

  var link = [
    "https://i.imgur.com/yjwQQsv.jpg", "https://i.imgur.com/bMuOehO.jpg", "https://i.imgur.com/2N3AFR7.jpg", 
    "https://i.imgur.com/xzBD0ix.jpg", "https://i.imgur.com/xTqk7WU.jpg", "https://i.imgur.com/SoT9yiF.jpg",
    // (Other image URLs)
  ];

  var callback = () => api.sendMessage({
    body: `┏━━━━━┓\n     ꧁𝐐𝐔𝐃𝐔𝐒 𝐉𝐀𝐌𝐀𝐋𝐈꧂         ✧══•❁😛❁•══✧\n┗━━━━━┛\n\n♥️`, 
    attachment: fs.createReadStream(__dirname + "/cache/1.jpg")
  }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/1.jpg"));

  return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
    .pipe(fs.createWriteStream(__dirname + "/cache/1.jpg"))
    .on("close", () => callback());
};
