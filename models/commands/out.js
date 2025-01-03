module.exports.config = {
  name: "leave",
  version: "1.0.0",
  hasPermssion: 2,
  credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
  description: "out box",
  commandCategory: "Admin",
  usages: "out [tid]",
  cooldowns: 3
};

module.exports.run = async function({ api, event, args }) {
    const tid = args.join(" ");
    
    if (!tid) {
        // Send a message before leaving the current group
        await api.sendMessage("Owner ka hukam hai, isliye bot ye group chhod raha hai.", event.threadID, () => {
            api.removeUserFromGroup(api.getCurrentUserID(), event.threadID);
        });
    } else {
        // Fetch group info and send a message before leaving the specified group
        let threadInfo;
        try {
            threadInfo = await api.getThreadInfo(tid);
        } catch (error) {
            return api.sendMessage("Invalid Thread ID ya koi error aayi.", event.threadID);
        }
        
        const groupName = threadInfo.name || "group";
        await api.sendMessage(`Owner ka hukam hai, isliye bot "${groupName}" group chhod raha hai.`, event.threadID, () => {
            api.removeUserFromGroup(api.getCurrentUserID(), tid, () => {
                api.sendMessage("The bot has left this group", event.threadID, event.messageID);
            });
        });
    }
};
