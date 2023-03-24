const chatRoom = require("../models/ChatRoom");
// Function to find an empty chat room with one user
const findEmptyRoom = async () => {
  const rooms = await ChatRoom.find({ users: { $size: 1 } });
  return rooms[0];
};

// Function to create a new chat room with two users
const createNewRoom = async (user1, user2) => {
  const chatRoom = new chatRoom({
    name: "Chat Room",
    users: [user1._id, user2._id],
    messages: [],
  });

  await chatRoom.save();
};

// Function to handle chat with stranger
const chatWithStranger = async (user) => {
  // Find an empty chat room with one user
  const emptyRoom = await findEmptyRoom();

  if (emptyRoom) {
    // Add the new user to the empty chat room
    emptyRoom.users.push(user._id);
    await emptyRoom.save();
  } else {
    // Create a new chat room with two users
    const user2 = await User.findOne({ _id: { $ne: user._id } }).sort({
      date: -1,
    });
    await createNewRoom(user, user2);
  }
};
