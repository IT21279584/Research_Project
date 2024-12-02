const express = require("express");
const upload = require("multer")();
const {
  riceDiseasePrediction,
  getPreviousPredictions,
} = require("../controllers/riceDiseaseController");

const router = express.Router();

router.post(
  "/rice-disease-predictions",
  upload.array("images", 1),
  riceDiseasePrediction
);
router.get("/rice-previous-predictions", getPreviousPredictions);

module.exports = router;
