const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  projectID: { type: Number, required: true, unique: true },
  name: { type: String, unique: true, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  projectManager: { type: Number, ref: "User" }, // Reference to Users collection
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
