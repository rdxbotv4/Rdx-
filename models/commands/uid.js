module.exports.config = {
    name: "uid",
    version: "1.1.0",
    hasPermssion: 0,
    credits: "𝐏𝐫𝐢𝐲𝐚𝐧𝐬𝐡 𝐑𝐚𝐣𝐩𝐮𝐭",
    description: "Get User ID and Profile Picture.",
    commandCategory: "Tools",
    cooldowns: 5
};

module.exports.run = function({ api, event }) {
    if (Object.keys(event.mentions).length === 0) {
        return api.sendMessage(`${event.senderID}`, event.threadID, event.messageID);
    } else {
        for (let i = 0; i < Object.keys(event.mentions).length; i++) {
            let userId = Object.keys(event.mentions)[i];
            let userName = Object.values(event.mentions)[i].replace('@', '');

            // Constructing the profile picture URL
            let profilePicUrl = `https://graph.facebook.com/${userId}/picture?type=large`;

            // Sending the message with both UID and profile picture
            api.sendMessage({
                body: `${userName}: ${userId}`,
                attachment: profilePicUrl
            }, event.threadID, (error, info) => {
                if (error) {
                    console.log("Error sending message:", error);
                    api.sendMessage("An error occurred while processing your request.", event.threadID);
                }
            });
        }
        return;
    }
};
