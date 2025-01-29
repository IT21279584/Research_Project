const express = require("express");
const { viewProfile, updateProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
const upload = require("../config/s3");

const router = express.Router();

router.get("/profile", protect, viewProfile);
router.put("/profile", protect, upload.single("profilePicture"), updateProfile);

module.exports = router;
