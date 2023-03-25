const mongoose = require("mongoose");

const chatRoomModel = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: "testUser" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "chatMessage" }],
});
const chatRoom = mongoose.model("chatRoom", chatRoomModel);
module.exports = chatRoom;
