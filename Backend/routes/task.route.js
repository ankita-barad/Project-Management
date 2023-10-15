const express = require("express");
const taskRouter = express.Router();
const { TaskModel } = require("../models/task.model");
const { auth } = require("../middleware/validateToken");
const { requireRole } = require("../middleware/admin_Role");

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

// Create a new task under a specific project
taskRouter.post("/create/:projectId", async (req, res) => {
  try {
    const { projectId } = req.params; // Extract projectId from URL
    const task = new TaskModel({ ...req.body, projectID: projectId });
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all tasks for a specific project by project ID
taskRouter.get("/list/:projectId", async (req, res) => {
  try {
    const projectId = req.params.projectId; // Extract projectId from URL
    const tasks = await TaskModel.find({ projectID: projectId });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task by ID under a specific project
taskRouter.put("/update/:projectId/:taskId", async (req, res) => {
  try {
    const { projectId, taskId } = req.params; // Extract projectId and taskId from URL
    const updatedTask = await TaskModel.findByIdAndUpdate(
      taskId,
      { ...req.body, projectID: projectId },
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

// Delete a task by ID under a specific project
taskRouter.delete("/delete/:projectId/:taskId", async (req, res) => {
  try {
    const { projectId, taskId } = req.params; // Extract projectId and taskId from URL
    const deletedTask = await TaskModel.findByIdAndRemove(taskId);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { taskRouter };
