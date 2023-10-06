const mongoose = require("mongoose");
const teamSchema = new mongoose.Schema({
  teamID: { type: Number, required: true, unique: true },
  teamName: { type: String, unique: true, required: true },
});

const TeamModel = mongoose.model("team", teamSchema);
module.exports = { TeamModel };
