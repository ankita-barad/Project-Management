const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
