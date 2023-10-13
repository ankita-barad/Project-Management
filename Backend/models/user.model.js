const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "project_manager", "team_member"],
  },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
