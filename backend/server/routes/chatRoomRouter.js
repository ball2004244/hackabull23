const express = require("express");
const chatRoomRouter = express.Router();


const { createNewRoom, chatWithStranger, deleteChatRoom} = require("../controllers/chatRoom");


chatRoomRouter.post("/", createNewRoom);
chatRoomRouter.post("/", chatWithStranger);
chatRoomRouter.delete("/:chatRoomId", deleteChatRoom);

module.exports = chatRoomRouter;