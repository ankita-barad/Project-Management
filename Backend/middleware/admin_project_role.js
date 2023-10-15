const { UserModel } = require("../models/user.model");

const requireAdminProjectManagerRoles = async (req, res, next) => {
  console.log("tfyguhitfyguhj", req);
  const user = await UserModel.findById(req.userId);
  console.log(user);
  if (!user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (!user || (user.role !== "admin" && user.role !== "project_manager")) {
    return res
      .status(403)
      .json({ message: "Access denied for admin or project_manager roles" });
  }
  next();
};

module.exports = { requireAdminProjectManagerRoles };
