const express = require("express");
const { getPreviousResults } = require("../controllers/resultController");

const router = express.Router();

router.get("/", getPreviousResults);

module.exports = router;
