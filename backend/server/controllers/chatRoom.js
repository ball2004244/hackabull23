const chatRoom = require("../models/ChatRoom");


// Function to create a new chat room with two users
const createNewRoom = async (req, res) => {
  const {user2id} = req.body
  try {
    const newChatRoom = new chatRoom({
      name: "Chat Room",
      users: [req.user._id, user2id],
      messages: [],
    });

    await newChatRoom.save();
    res.status(200).json({ message: "Chat room created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create chat room" });
  }
};
const chatWithStranger = async (req, res) => {
  try {
    const user = req.user; // Assuming the authenticated user is available in the request object
    // Find a chat room with one user
    const oldChatRoom = await chatRoom.aggregate([{ $match: { users: { $size: 1 } } }, { $sample: { size: 1 } }]);
    if (oldChatRoom) {
      // Clear the messages history of the chat room
      oldChatRoom.messages = [];
      // Add the new user to the chat room
      oldChatRoom.users.push(user._id);
      await oldChatRoom.save();
    } else {
      // Create a new chat room with the new user
      const newChatRoom = new chatRoom({
        name: "Chat Room",
        users: [user._id],
        messages: [],
      });
      await newChatRoom.save();
    }

    // Send a response back to the client
    res.status(200).json({ message: "Successfully joined chat room" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to join chat room" });
  }
};
const deleteChatRoom = async (req, res) => {
  try {
    const chatRoomId = req.params.chatRoomId;
    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      return res.status(404).json({ error: "Chat room not found" });
    }

    // If the chat room has only one user, delete the chat room
    if (chatRoom.users.length === 1) {
      await chatRoom.delete();
      return res.status(200).json({ message: "Chat room deleted successfully" });
    }

    // Otherwise, just remove the user from the chat room
    const userToRemoveIndex = chatRoom.users.indexOf(req.user._id);
    if (userToRemoveIndex >= 0) {
      chatRoom.users.splice(userToRemoveIndex, 1);
      await chatRoom.save();
    }

    res.status(200).json({ message: "User removed from chat room" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete chat room" });
  }
};
module.exports = {createNewRoom, chatWithStranger,deleteChatRoom};

