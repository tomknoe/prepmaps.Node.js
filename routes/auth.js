const express = require("express");
const router = express.Router();

const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validateFields");
const { validateJwt } = require("../middlewares/processJwt");

const {
  getAllUsers,
  getUserById,
  signUpUser,
  loginUser,
  updateUser,
  deleteUser,
} = require("../controllers/authController");

router.get("/", getAllUsers);

router.get("/user/:id", getUserById);

router.post(
  "/signup",
  check("name", "A name is required").not().isEmpty(),
  check("email", "A a valid email is required").isEmail(),
  check(
    "password",
    "Password must be 8 characters long with capital letter & symbol"
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i"),
  check("website", "A valid website is required").isURL(),
  check("address", "An address is required").not().isEmpty(),
  check(
    "phone",
    "Must be a phone number of the format (000) 000-0000, (000)000-000, or 000-000-000"
  ).matches(/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/, "i"),

  validateFields,
  signUpUser
);

router.post("/login", loginUser);

router.put("/user/:id", validateJwt, updateUser);

router.delete("/user/:id", validateJwt, deleteUser);

module.exports = router;
