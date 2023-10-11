const mongoose = require("mongoose");
const teamMemeberSchema = new mongoose.Schema({
  userID: { type: Number, required: true, ref: "user" }, // Reference to Users collection
  teamID: { type: Number, required: true, ref: "team" }, // Reference to Teams collection
});

const TeamMemeberModel = mongoose.model("teamMember", teamMemeberSchema);
module.exports = { TeamMemeberModel };
