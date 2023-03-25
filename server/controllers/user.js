userRouter = require("express").Router();

const { response } = require("express");

// Doing CRUD with user in mongodb

const User = require("../models/User");

// Get all users
userRouter.get("/get", (req, res) => {
  User.find()
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
});

// Create a new user
userRouter.post("/create", (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    });
});

// Find a single user with a userId
userRouter.get("/:id", (req, res) => {
  User.findById(req.params.id)

    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id,
      });
    });
});

// Update a user identified by the userId in the request
userRouter.put("/:id", (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    },
    { new: true }
  )

    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error updating user with id " + req.params.id,
      });
    });
});

// Delete a user with the specified userId in the request
userRouter.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
    })

    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "User not found with id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Could not delete user with id " + req.params.id,
      });
    });

  res.send("Delete Successfully");
});


userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // get all users
    const users = await User.find();

    // check if the email is already in the database
    const user = users.find((user) => user.email === email);

    if (!user) {
      return res.status(400).send({ message: "Email does not exist" });
    }

    if (!(await user.matchPassword(password))) {
      return res.status(400).send({ message: "Password is incorrect" });
    }

    // generate a token
    const generateToken = require("../middlwares/token");
    const token = generateToken(user._id);

    // send the user and the token back to the client
    res.send({ user, token });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // get all users
    const users = await User.find();

    // check if the email is already in the database
    const user = users.find((user) => user.email === email);

    if (user) {
      return res.status(400).send({ message: "Email already exists" });
    }

    // create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // generate a token
    const generateToken = require("../middlwares/token");
    const token = generateToken(newUser._id);

    // send the user and the token back to the client
    res.send({ newUser, token });
  }
  catch (error) {
    console.log(error);
  }
});

module.exports = userRouter;
