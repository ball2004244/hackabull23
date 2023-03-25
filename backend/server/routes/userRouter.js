userRouter = require("express").Router();
const User = require("../models/User")
const { allUsers, registerUser, authUser} = require("../controllers/user")
const {protect} = require("../middlwares/auth")
// Doing CRUD with user in mongodb


// Get all users with query
userRouter.get("", protect, allUsers)

// Create a new user
userRouter.post("/", registerUser)
userRouter.post("/login", authUser)


module.exports = userRouter;

// // Find a single user with a userId
// userRouter.get("/:id", (req, res) => {
//   User.findById(req.params.id)

//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error retrieving user with id " + req.params.id,
//       });
//     });
// });

// Update a user identified by the userId in the request
// userRouter.put("/:id", (req, res) => {
//   User.findByIdAndUpdate(
//     req.params.id,
//     {
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     },
//     { new: true }
//   )

//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//       res.send(user);
//     })
//     .catch((err) => {
//       if (err.kind === "ObjectId") {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Error updating user with id " + req.params.id,
//       });
//     });
// });

// // Delete a user with the specified userId in the request
// userRouter.delete("/:id", (req, res) => {
//   User.findByIdAndRemove(req.params.id)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//     })

//     .catch((err) => {
//       if (err.kind === "ObjectId" || err.name === "NotFound") {
//         return res.status(404).send({
//           message: "User not found with id " + req.params.id,
//         });
//       }
//       return res.status(500).send({
//         message: "Could not delete user with id " + req.params.id,
//       });
//     });

//   res.send("Delete Successfully");
// });