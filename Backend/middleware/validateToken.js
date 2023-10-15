const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const auth = async (req, res, next) => {
  try {
    // Check if Authorization header exists
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "Unauthorized - Missing Authorization header" });
    }
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { userId } = decodedToken;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.userId = userId;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { auth };
