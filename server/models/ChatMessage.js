const mongoose = require("mongoose");

const chatMessageModel = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "testUser",
  },
  message: String,
  timestamp: { type: Date, default: Date.now },
});
const chatText = mongoose.model("chatText", chatMessageModel);

module.exports = chatText;
