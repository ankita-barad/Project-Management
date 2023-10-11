const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  projectManager: { type: String, ref: "user" }, // Reference to Users collection
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
