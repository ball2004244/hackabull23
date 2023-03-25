const mongoose = require("mongoose");
const mongoUrl = process.env.MONGODB_URI;
console.log("Connecting to...");

const connectDB = async () => {
  try {
    await console.log(mongoUrl, "connecting...");
    await mongoose.connect(mongoUrl);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
