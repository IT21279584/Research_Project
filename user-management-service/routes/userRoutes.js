const express = require("express");
const { viewProfile, updateProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

const multer = require("multer");
const upload = multer();

const router = express.Router();

router.get("/profile", protect, viewProfile);
router.put("/profile", protect, upload.single("profilePicture"), updateProfile);

module.exports = router;
