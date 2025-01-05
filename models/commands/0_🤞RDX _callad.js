module.exports.config = {
  name: "callad",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "RDX_ZAIN",
  description: "Report bug of your bot to admin or comment",
  commandCategory: "Admin",
  usages: "[msg]",
  cooldowns: 5,
};

module.exports.handleReply = async function({ api, args, event, handleReply, Users }) {
  try {
    var name = (await Users.getData(event.senderID)).name;
    var s = [];
    var l = [];
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length || 20;

    if (event.attachments.length != 0) {
      for (var p of event.attachments) {
        var result = '';
        for (var i = 0; i < charactersLength; i++) result += characters.charAt(Math.floor(Math.random() * charactersLength));
        var e = {
          photo: 'jpg',
          video: 'mp4',
          audio: 'mp3',
          animated_image: 'gif'
        }[p.type] || 'jpg';

        var o = join(__dirname, 'cache', `${result}.${e}`);
        let m = (await axios.get(encodeURI(p.url), { responseType: "arraybuffer" })).data;
        fs.writeFileSync(o, Buffer.from(m, "utf-8"));
        s.push(o);
        l.push(fs.createReadStream(o));
      }
    };

    switch (handleReply.type) {
      case "reply": {
        var idad = global.config.ADMINBOT;
        if (s.length == 0) {
          for (let ad of idad) {
            api.sendMessage({
              body: `[📲] Feedback from ${name}:\n[💬] Content: ${(event.body) || "There's no answer"}`,
              mentions: [{ id: event.senderID, tag: name }]
            }, ad);
          }
        } else {
          for (let ad of idad) {
            api.sendMessage({
              body: `[📲] Feedback from ${name}:\n[💬] Content: ${(event.body) || "Only files sent, no text"}`,
              attachment: l,
              mentions: [{ id: event.senderID, tag: name }]
            }, ad);
            for (var b of s) {
              fs.unlinkSync(b);
            }
          }
        }
        break;
      }
    }
  } catch (ex) {
    console.log(ex);
  }
};

module.exports.run = async function({ api, event, Threads, args, Users }) {
  try {
    const fs = require('fs-extra');
    const { join } = require('path');
    const axios = require('axios');

    if (!args[0] && !event.messageReply)
      return api.sendMessage(`You haven't entered what to report 📋`, event.threadID, event.messageID);

    var name = (await Users.getData(event.senderID)).name;
    var idbox = event.threadID;
    var datathread = (await Threads.getData(event.threadID)).threadInfo;
    var namethread = datathread.threadName;
    var uid = event.senderID;

    const moment = require("moment-timezone");
    var gio = moment.tz("Asia/Manila").format("HH:mm:ss D/MM/YYYY");

    const adminID = "100086033644262"; // Your Facebook ID here

    // Notify the admin directly
    api.sendMessage(
      `[🔔] New report received!\n\n[👤] From: ${name}\n[❗] User ID: ${uid}\n[💬] Message: ${args.join(" ") || "No content provided"}\n[📌] Thread Name: ${namethread}\n[⏰] Time: ${gio}`,
      adminID
    );

    // Acknowledge the user
    api.sendMessage(
      `[🤖] Your report has been sent to the admin. Thank you for your feedback!`,
      event.threadID,
      event.messageID
    );
  } catch (ex) {
    console.log(ex);
  }
};
