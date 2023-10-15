const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

userRouter.post("/register", async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;
    const userExists = await UserModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving it
    const saltRounds = 10; // You can adjust the number of salt rounds for security
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = new UserModel({
      username,
      email,
      password: hashedPassword,
      role,
    });
    await user.save();
    res.json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
});

// Login endpoint
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await UserModel.findOne({ email });

    // If the user doesn't exist, return an error
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If the passwords don't match, return an error
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }

    // If authentication is successful, generate a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET, // Replace with your own secret key
      { expiresIn: "1h" } // Token expiration time
    );

    // Return the token to the client
    res.json({ token, user });
  } catch (error) {
    next(error);
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a user by ID
userRouter.get("/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a user by ID
userRouter.put("/:userId", async (req, res) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.userId,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
userRouter.delete("/:userId", async (req, res) => {
  try {
    const deletedUser = await UserModel.findByIdAndRemove(req.params.userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { userRouter };
