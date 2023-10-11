const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  projectID: { type: String, required: true, ref: "project" },
  parentTask: { type: String, ref: "task" }, // Reference to Tasks collection
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };
