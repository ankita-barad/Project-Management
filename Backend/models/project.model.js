const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  projectManagerName: { type: String },
  projectManager: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user", // Reference to the User model
  },
});

const ProjectModel = mongoose.model("project", projectSchema);

module.exports = { ProjectModel };
