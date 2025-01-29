// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const viewProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile", error });
  }
};
const updateProfile = async (req, res) => {
  const { name, email, password, country } = req.body;
  let profilePicture = req.file ? req.file.location : undefined;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ message: "Email already in use" });
    }

    // If password is provided, update it
    if (password) {
      user.password = password; // Password will be hashed automatically in pre-save hook
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.country = country || user.country;
    if (profilePicture) user.profilePicture = profilePicture;

    await user.save(); // Save user, pre-save hook will hash password if changed
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};


module.exports = { viewProfile, updateProfile };
