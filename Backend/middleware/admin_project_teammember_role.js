const { UserModel } = require("../models/user.model");
const requireAdminProjectManagerTeamMemberRoles = async (req, res, next) => {
  const user = await UserModel.findById(req.userId);
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (
    !user ||
    (user.role !== "admin" &&
      user.role !== "project_manager" &&
      user.role !== "team_member")
  ) {
    return res.status(403).json({
      message: "Access denied for admin, project_manager, or team_member roles",
    });
  }
  next();
};

module.exports = { requireAdminProjectManagerTeamMemberRoles };
