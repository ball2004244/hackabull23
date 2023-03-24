const express = require("express");
require("dotenv").config();
const userRouter = require("../server/controllers/user");

const app = express();
app.use(express.json());

const cor = require("cors");

app.use(cor());
app.use(express.json());
app.use("", userRouter);

const connectDB = require("./config/mongo");
connectDB();
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Sever running on port ${PORT}`);
});
