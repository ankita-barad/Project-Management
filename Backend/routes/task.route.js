const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("./models/task.model");

// Create a new task
taskRouter.post("/create", async (req, res) => {
  try {
    const task = new TaskModel(req.body);
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks
taskRouter.get("/list", async (req, res) => {
  try {
    const tasks = await TaskModel.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a task by ID
taskRouter.get("/get/:id", async (req, res) => {
  try {
    const task = await TaskModel.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task by ID
taskRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedTask = await TaskModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task by ID
taskRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTask = await TaskModel.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { taskRouter };
