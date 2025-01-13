const express = require("express");
const multer = require("multer");
const { classifyImages } = require("../controllers/classifyController");

const router = express.Router();
const upload = multer();

router.post("/", upload.array("file", 2), classifyImages);

module.exports = router;
