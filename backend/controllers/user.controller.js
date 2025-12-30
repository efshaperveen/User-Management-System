const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.getProfile = async (req, res) => {
  res.status(200).json(req.user);
};


exports.updateProfile = async (req, res) => {
  const { fullName, email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { fullName, email },
    { new: true }
  );

  res.status(200).json(updatedUser);
};


exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id).select("+password");

  const isMatch = await bcrypt.compare(oldPassword, user.password);

  if (!isMatch)
    return res.status(400).json({ message: "Old password incorrect" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password updated successfully" });
};


// Admin: get all users with pagination
exports.getAllUsers = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const users = await User.find()
    .skip(skip)
    .limit(limit)
    .select("-password");

  const total = await User.countDocuments();

  res.status(200).json({
    users,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
};

exports.updateUserStatus = async (req, res) => {
  const { status } = req.body;

  if (!["active", "inactive"].includes(status))
    return res.status(400).json({ message: "Invalid status" });

  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );

  res.status(200).json(user);
};

