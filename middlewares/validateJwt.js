const jwt = require("jsonwebtoken");

const User = require("../models/User");

const validateJwt = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Token not found" });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(uid);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = {
  validateJwt,
};
