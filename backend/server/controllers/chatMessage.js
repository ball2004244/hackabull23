const chatMessage = require("../models/ChatMessage");
// Function to add a new chat message to a specific chat room
const addChatMessage = async (roomId, userId, message, socket) => {
  try {
    // Create a new ChatMessage object with the sender's ID and the message text
    const  newChatMessage = new chatMessage({
      chatRoom: roomId,
      user: userId,
      message: message,
    });

    // Save the chat message to the database
    await newChatMessage.save();

    // Retrieve the chat messages for the chat room
    const chatMessages = await chatMessage
      .find({ chatRoom: roomId })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    // Emit the new chat message to all users in the chat room
    socket.to(roomId).emit("newChatMessage", newChatMessage);

    // Emit the chat messages to all users in the chat room
    socket.to(roomId).emit("chatMessages", chatMessages);

    // Return the chat message object
    return chatMessage;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to add chat message");
  }
};

// Function to get all chat messages for a specific chat room
const getChatMessages = async (roomId) => {
  try {
    // Find all chat messages for the specified chat room
    const chatMessages = await chatMessage
      .find({ chatRoom: roomId })
      .populate("user", "username")
      .sort({ createdAt: 1 });

    // Return the chat messages array
    return chatMessages;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get chat messages");
  }
};


module.exports = {
  addChatMessage,
  getChatMessages,
};