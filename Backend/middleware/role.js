const { UserModel } = require("../models/user.model");
function requireRole(role) {
  return async (req, res, next) => {
    const user = await UserModel.findById(req.userId);
    console.log(user);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    // Check if the user's role matches the required role
    console.log(user.role);
    if (user && user.role === role) {
      next(); // User has the required role, proceed to the route
    } else {
      res.status(403).json({ message: "Access denied" }); // User does not have the required role
    }
  };
}

module.exports = { requireRole };
