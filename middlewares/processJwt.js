const jwt = require("jsonwebtoken");

const User = require("../models/User");

const generateJwt = (id) => {
  return new Promise((resolve, reject) => {
    const data = { uid: id };
    jwt.sign(
      data,
      process.env.SECRET_KEY,
      { expiresIn: "4h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

const validateJwt = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(400).json({ message: "Token not found" });
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await User.findById(uid);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = {
  generateJwt,
  validateJwt,
};
