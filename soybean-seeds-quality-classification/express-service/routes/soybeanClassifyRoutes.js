const express = require("express");
const multer = require("multer");
const { classifyImages } = require("../controllers/soybeanClassifyController");

const router = express.Router();
const upload = multer();

router.post(
  "/",
  upload.array("images", 2),
  classifyImages
);

module.exports = router;