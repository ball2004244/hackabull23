const chatRoom = require("../models/ChatRoom");


// Function to create a new chat room with two users
const createNewRoom = async (user1, user2, socket) => {
  try {
    const newChatRoom = new chatRoom({
      name: "Chat Room",
      users: [user1._id, user2._id],
      messages: [],
    });

    await newChatRoom.save();
    socket.emit("joinRoom", newChatRoom._id);
  } catch (error) {
    console.error(error);
  }
};

// Function to handle chat with stranger
const chatWithStranger = async (user, socket) => {
  try {
    // Find a chat room with one user
    const oldChatRoom = await chatRoom.findOne({ users: { $size: 1 } });

    if (oldChatRoom) {
      // Add the new user to the chat room
      chatRoom.users.push(user._id);
      await chatRoom.save();
      socket.emit("joinRoom", chatRoom._id);
    } else {
      // Create a new chat room with the new user
      const newChatRoom = new chatRoom({
        name: "Chat Room",
        users: [user._id],
        messages: [],
      });
      await newChatRoom.save();
      socket.emit("waitInRoom", newChatRoom._id);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {  createNewRoom, chatWithStranger };

