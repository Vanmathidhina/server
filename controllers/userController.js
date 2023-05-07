const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, age } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    return res.json({ msg: "Fields cannot be empty" });
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    return res.json({ msg: "User already exists" });
  }

  const user = await User.create({
    email,
    name,
    password,
    age,
  });

  if (user) {
    return res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  } else {
    res.status(400).json({ Error: "Something went wrong!" });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && user.password === password) {
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
    });
  }
  res.status(400).json({ Error: "Invalid Credentials" });
});

module.exports = { registerUser, loginUser };
