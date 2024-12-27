module.exports.config = {
  name: "antiout",
  eventType: ["log:unsubscribe"],
  version: "0.0.1",
  credits: "𝙋𝙧𝙞𝙮𝙖𝙣𝙨𝙝 𝙍𝙖𝙟𝙥𝙪𝙩",
  description: "Listen to events and prevent users from leaving."
};

module.exports.run = async ({ event, api, Threads, Users }) => {
  let data = (await Threads.getData(event.threadID)).data || {};
  if (data.antiout === false) return;

  if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()) return;

  const userId = event.logMessageData.leftParticipantFbId;
  const userName =
    global.data.userName.get(userId) || (await Users.getNameUser(userId));
  const isSelfSeparation = event.author == userId;

  if (isSelfSeparation) {
    const reAddUser = () => {
      api.addUserToGroup(userId, event.threadID, (error) => {
        if (error) {
          api.sendMessage(
            `Isse Dubara Add Nhi Kar Paya 🥺 ${userName} Group Mai :( `,
            event.threadID
          );
        } else {
          api.sendMessage(
            `Bhag Ke Jaane Ka Nhi zain ki permission k bagir nhi ja sakti, ${userName} Baby, Dekho Phir Se Add Kardiya Aapko`,
            event.threadID
          );
        }
      });
    };

    // Continuously try to re-add the user if they keep leaving
    const intervalId = setInterval(() => {
      reAddUser();
    }, 2000);

    // Stop re-adding after 5 attempts (optional, to prevent infinite loop)
    setTimeout(() => {
      clearInterval(intervalId);
    }, 10000);
  }
};
