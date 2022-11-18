const { generateJwt } = require("../middlewares/processJwt");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  try {
    if (users.length === 0) {
      return res.status(400).json({ message: "Didn't find any users" });
    }
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't get the users" });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Please try again later" });
  }
};

const signUpUser = async (req, res) => {
  const { email } = req.body;
  const testEmail = await User.findOne({ email }); // {email: req.body.email}
  if (testEmail) {
    return res.status(500).json({ message: "Email already in use" });
  }
  const user = new User(req.body);
  try {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(req.body.password, salt);
    user.save();
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't create the user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(500).json({ message: "Please check credentials" }); // user is not found
  }
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(500).json({ message: "Please check credentials" });
  }
  const token = await generateJwt(user._id);
  return res.status(200).json({ user, token });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const userToUpdate = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(userToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Couldn't update the user" });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  try {
    return res.status(203).json({ message: "Succesfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Couldn't delete user" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  signUpUser,
  loginUser,
  updateUser,
  deleteUser,
};
