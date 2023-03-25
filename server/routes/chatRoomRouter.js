const express = require("express");
const chatRoomRouter = express.Router();
const {createNewRoom,chatWithStranger} = require("../controllers/chatRoom");

// Route to create a new chat room
chatRoomRouter.post("/create", async (req, res) => {
  try {
    const { user1, user2 } = req.body;
    await createNewRoom(user1, user2, req.app.locals.io);
    res.status(201).json({ message: "Chat room created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to join a chat room
chatRoomRouter.post("/join", async (req, res) => {
  try {
    const { userId } = req.body;
    const chatRoom = await chatWithStranger(userId, req.app.locals.io);
    if (chatRoom) {
      res.json({ chatRoom });
    } else {
      res.status(404).json({ message: "No chat room available" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = chatRoomRouter;