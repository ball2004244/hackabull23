const chatMessage = require("../models/ChatMessage")

// Function to add a new chat message to a specific chat room

// Controller function to add a new chat message to a specific chat room
const addChatMessage = async (req, res) => {
  try {
    // Create a new ChatMessage object with the sender's ID and the message text
    const newChatMessage = new chatMessage({
      chatRoom: req.params.roomId,
      user: req.user._id,
      message: req.body.message,
    });

    // Save the chat message to the database
    await newChatMessage.save();

    // Retrieve the chat messages for the chat room
    const chatMessages = await chatMessage
      .find({ chatRoom: req.params.roomId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });

    // Emit the new chat message to all users in the chat room (this logic should be handled separately in the appropriate file and on the client-side frontend)

    // Return the chat message object
    res.status(201).json(newChatMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add chat message" });
  }
};

const getChatMessages= async (req, res) => {
  try {
    const messages = await chatMessage.find({ chat: req.params.chatRoomId })
      .populate("sender", "name email")
      .populate("message");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
};

module.exports = {
  addChatMessage,
  getChatMessages,
};