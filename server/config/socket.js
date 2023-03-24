// Import the ChatRoom and ChatMessage models
const chatRoom = require("../models/ChatRoom");
const chatText = require("../models/ChatMessage");

const setupSocketIO = (server) => {
  // Initialize the socket.io server with the http server
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("User connected");

    // Listen for the "join room" event
    socket.on("join room", async (data) => {
      console.log(`User ${data.userId} joined room ${data.roomId}`);

      // Add the socket to the specified room
      socket.join(data.roomId);

      // Find the chat room with the specified ID and populate the "users" field with user objects
      const room = await chatRoom.findById(data.roomId).populate("users");

      // Emit the "user joined" event to all sockets in the room, with information about the user and the room
      io.to(data.roomId).emit("user joined", { user: data.userId, room });

      // Listen for the "chat message" event
      socket.on("chat message", async (message) => {
        console.log(`Message received: ${message}`);

        // Create a new ChatMessage object with the sender's ID, the message text, and the room ID
        const chatMessage = new chatText({
          sender: data.userId,
          message: message,
          room: data.roomId,
        });

        // Save the chat message to the database
        await chatMessage.save();

        // Emit the "chat message" event to all sockets in the room, with information about the sender and the message
        io.to(data.roomId).emit("chat message", {
          sender: data.userId,
          message: message,
        });
      });
    });

    // Listen for the "disconnect" event
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

module.exports = setupSocketIO;
