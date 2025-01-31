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
// controllers/profileController.js
const { uploadToS3 } = require("../config/s3");

const updateProfile = async (req, res) => {
  const { name, email, password, country } = req.body;
  let profilePicture;

  // Check if there is a file to upload
  if (req.file) {
    const imageKey = `profile-pictures/${Date.now().toString()}-${req.file.originalname}`;
    try {
      // Upload the file to S3
      profilePicture = await uploadToS3(req.file, imageKey); // Upload file and get the S3 URL
    } catch (error) {
      return res.status(500).json({ message: "Error uploading profile picture", error });
    }
  }

  try {
    // Find the user by their ID
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Check if email is being updated and if it already exists
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists)
        return res.status(400).json({ message: "Email already in use" });
    }

    // Update password if provided
    if (password) {
      user.password = password; // Password will be hashed automatically in pre-save hook
    }

    // Update other user details
    user.name = name || user.name;
    user.email = email || user.email;
    user.country = country || user.country;
    if (profilePicture) user.profilePicture = profilePicture;

    // Save the updated user details
    await user.save(); // Pre-save hook will hash password if changed
    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error });
  }
};

module.exports = { updateProfile };



module.exports = { viewProfile, updateProfile };
