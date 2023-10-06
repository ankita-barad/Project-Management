const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskID: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  priority: { type: String, required: true },
  status: { type: String, required: true },
  projectID: { type: Number, required: true },
  parentTask: { type: Number, ref: "Task" }, // Reference to Tasks collection
});

const TaskModel = mongoose.model("task", taskSchema);
module.exports = { TaskModel };
