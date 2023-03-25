const socketIo = require("socket.io");
const { addChatMessage, getChatMessages } = require("../controllers/chatMessage");

const setupSocketIO = (server) => {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on("connection", (socket) => {
    // Handle connection event
    console.log(`Socket ${socket.id} connected`);

    // Handle disconnection event
    socket.on("disconnect", () => {
      console.log(`Socket ${socket.id} disconnected`);
    });

    // Handle join room event
    socket.on("joinRoom", async (roomId) => {
      try {
        socket.join(roomId);
        console.log(`User joined room ${roomId}`);

        // Retrieve the chat messages for the chat room
        const chatMessages = await getChatMessages(roomId);

        // Emit the chat messages to all users in the chat room
        socket.emit("chatMessages", chatMessages);
      } catch (error) {
        console.error(error);
      }
    });

    // Handle wait in room event
    socket.on("waitInRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User waiting in room ${roomId}`);
    });

    // Handle leave room event
    socket.on("leaveRoom", async (roomId) => {
      // Leave the specified chat room
      socket.leave(roomId);
      console.log(`Socket ${socket.id} left room ${roomId}`);
    });
    
// Handle send message event
socket.on("sendMessage", ({ roomId, userId, message }) => {
  // Emit newMessage event to all clients in the room
  io.to(roomId).emit("newMessage", { roomId, userId, message });
});
    
  });
};

module.exports = setupSocketIO;
