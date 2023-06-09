const express = require("express");
require("dotenv").config();
const setupSocketIO = require("./config/socket");


const userRouter = require("../server/routes/userRouter");
// const emailRouter = require("../server/routes/sendEmailRouter");
const chatMessageRouter = require("./routes/chatMessageRouter")

const chatRoomRouter = require("./routes/chatRoomRouter")
const app = express();
app.use(express.json());

const cor = require("cors");

app.use(cor());
app.use(express.json());
app.use("/", userRouter);
// app.use("/sendemail", emailRouter);

app.use("/chat", chatRoomRouter);
app.use("/chat", chatMessageRouter)

const connectDB = require("./config/mongo");
connectDB();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
setupSocketIO(server);


