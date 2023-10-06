const express = require("express");
const projectRouter = express.Router();
const { ProjectModel } = require("../models/project.model");

// Create a new project
projectRouter.post("/create", async (req, res) => {
  try {
    const project = new ProjectModel(req.body);
    const savedProject = await project.save();
    res.json(savedProject);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all projects
projectRouter.get("/list", async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a project by ID
projectRouter.get("/get/:id", async (req, res) => {
  try {
    const project = await ProjectModel.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a project by ID
projectRouter.put("/update/:id", async (req, res) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a project by ID
projectRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedProject = await ProjectModel.findByIdAndRemove(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = { projectRouter };
