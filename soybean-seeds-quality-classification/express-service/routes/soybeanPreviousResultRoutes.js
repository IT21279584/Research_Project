const express = require("express");
const { getPreviousResults } = require("../controllers/soybeanPreviousResultController");

const router = express.Router();

router.get("/", getPreviousResults);

module.exports = router;
