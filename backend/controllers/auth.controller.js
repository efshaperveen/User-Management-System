const User = require("../models/User");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const asyncHandler = require("../utils/asyncHandler");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  const token = generateToken(user._id);

  res.status(201).json({ token, user });
};


exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. User exist karta hai ya nahi
  const user = await User.findOne({ email }).select("+password");

  if (!user)
    return res.status(401).json({ message: "Invalid credentials" });

  // 2. Account active hai ya nahi
  if (user.status !== "active")
    return res.status(403).json({ message: "Account is deactivated" });

  // 3. Password match
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return res.status(401).json({ message: "Invalid credentials" });

  // 4. last login update
  user.lastLogin = new Date();
  await user.save();

  // 5. token generate
  const token = generateToken(user._id);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    },
  });
});


exports.getMe = async (req, res) => {
  res.status(200).json(req.user);
};
