const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String },
  status: { type: String },
  assigne: { type: String },
  projectID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "project", // Reference to the User model
  },
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };
