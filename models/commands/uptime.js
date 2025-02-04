const os = require("os");
const fs = require("fs-extra");

const startTime = new Date(); // Moved outside onStart

module.exports = {
  config: {
    name: "uptime",
    version: "1.0.0",
    hasPermssion: 2,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "test",
    commandCategory: "box",
    usages: "test",
    dependencies: {},
    cooldowns: 5
  },

  run: async function ({ api, event, args }) {
    try {
      const uptimeInSeconds = (new Date() - startTime) / 1000;

      const seconds = uptimeInSeconds;
      const days = Math.floor(seconds / (3600 * 24));
      const hours = Math.floor((seconds % (3600 * 24)) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secondsLeft = Math.floor(seconds % 60);
      const uptimeFormatted = `${days}d ${hours}h ${minutes}m ${secondsLeft}s`;

      const loadAverage = os.loadavg();
      const cpuUsage =
        os
          .cpus()
          .map((cpu) => cpu.times.user)
          .reduce((acc, curr) => acc + curr) / os.cpus().length;

      const totalMemoryGB = os.totalmem() / 1024 ** 3;
      const freeMemoryGB = os.freemem() / 1024 ** 3;
      const usedMemoryGB = totalMemoryGB - freeMemoryGB;

     // const allUsers = await usersData.getAll();
     // const allThreads = await threadsData.getAll();
      const currentDate = new Date();
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      const date = currentDate.toLocaleDateString("en-US", options);
      const time = currentDate.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: true,
      });

      const timeStart = Date.now();
      await api.sendMessage({
        body: "🔎| checking........",
      }, event.threadID);

      const ping = Date.now() - timeStart;

      let pingStatus = "⛔| 𝖡𝖺𝖽 𝖲𝗒𝗌𝗍𝖾𝗆";
      if (ping < 1000) {
        pingStatus = "✅| 𝖲𝗆𝗈𝗈𝗍𝗁 𝖲𝗒𝗌𝗍𝖾𝗆";
      }
  const systemInfo = `╔━───━✦❀✦━───━╗  
        🌐 SYSTEM INFO 🌐  
╚━───━✦❀✦━───━╝
╭─⏳ 𝗨𝗣𝗧𝗜𝗠𝗘 𝗜𝗡𝗙𝗢 ───♡  
│ ⏰ Runtime: ${uptimeFormatted}  
╰─────────────────♡  
╭─💻 𝗦𝗬𝗦𝗧𝗘𝗠 𝗜𝗡𝗙𝗢 ───♡  
│ 🖥️ OS: ${os.type()} (${os.arch()})  
│ ⚙️ Language Version: ${process.version}  
│ 🚀 CPU Model: ${os.cpus()[0].model}  
│ 💾 Storage: ${usedMemoryGB.toFixed(2)} GB / ${totalMemoryGB.toFixed(2)} GB  
│ 📊 CPU Usage: ${cpuUsage.toFixed(1)}%  
│ 🧠 RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB  
╰─────────────────♡  
╭─━━━━❀━━━━─╮  
       🌟 OTHER DETAILS 🌟  
╰─━━━━❀━━━━─╯  
╭─✅ 𝗢𝗧𝗛𝗘𝗥 𝗜𝗡𝗙𝗢 ───♡  
│ 📅 Date: ${date}  
│ ⏱ Time: ${time}  
│ 📡 Ping: ${ping}ms  
│ 🚦 Status: ${pingStatus}  
╰─────────────────♡  
♡─────────────────♡
`;

      api.sendMessage(
        {
          body: systemInfo,
        },
        event.threadID,
        (err, messageInfo) => {
          if (err) {
            console.error("Error sending message with attachment:", err);
          } else {
            console.log(
              "Message with attachment sent successfully:",
              messageInfo,
            );
          }
        },
      );
    } catch (error) {
      console.error("Error retrieving system information:", error);
      api.sendMessage(
        "Unable to retrieve system information.",
        event.threadID,
        event.messageID,
      );
    }
  },
};
