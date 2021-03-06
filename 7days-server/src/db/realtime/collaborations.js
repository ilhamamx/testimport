const { realtimedb } = require("../firebase");

const createInitCollaborations = async(collaborationId, channel) => {
  const collabref = realtimedb.ref(`/collaborations/${collaborationId}/${channel}`);
  collabref.set({
    unreadMessages: 1
  });
}

const increaseUnreadMessage = async(collaborationId, channel) => {
  const collabref = realtimedb.ref(`/collaborations/${collaborationId}/${channel}`);
  await collabref.once("value", async(snapshot) => {
    if(!snapshot.val()){
      await createInitCollaborations(collaborationId, channel);
    }else{
      const unreadMessages = snapshot.val().unreadMessages;
      await collabref.update({
        unreadMessages: unreadMessages + 1
      });
    }
  })
}

module.exports = {
  createInitCollaborations,
  increaseUnreadMessage
}