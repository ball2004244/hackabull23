const express = require("express");
const chatMessageRouter = express.Router();
const { addChatMessage, getChatMessages } = require("../controllers/chatMessage");

// POST /api/chat/:roomId/message - Add a new chat message to a specific chat room
chatMessageRouter.post("/:chatRoomId/message", addChatMessage);

// GET /api/chat/:roomId/messages - Get all chat messages for a specific chat room
chatMessageRouter.get("/:chatRoomId/messages", getChatMessages);

module.exports = chatMessageRouter;