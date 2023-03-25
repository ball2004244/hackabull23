const express = require("express");
const chatMessageRouter = express.Router();
const { addChatMessage, getChatMessages } = require("../controllers/chatMessage");

// Route to add a new chat message to a specific chat room
chatMessageRouter.post("/:roomId/messages", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { userId, message } = req.body;

    // Add the new chat message to the database
    const chatMessage = await addChatMessage(roomId, userId, message, req.app.locals.io);

    // Emit the new chat message to all users in the chat room
    req.app.locals.io.to(roomId).emit("newChatMessage", chatMessage);

    // Return the chat message object
    res.status(201).json(chatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to get all chat messages for a specific chat room
chatMessageRouter.get("/:roomId/messages", async (req, res) => {
  try {
    const { roomId } = req.params;

    // Get all chat messages for the specified chat room
    const chatMessages = await getChatMessages(roomId);

    // Return the chat messages array
    res.status(200).json(chatMessages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = chatMessageRouter;