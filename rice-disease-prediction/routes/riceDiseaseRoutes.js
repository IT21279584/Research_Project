const express = require("express");
const upload = require("multer")();
const {
  riceDiseasePrediction,
  getPreviousPredictions,
} = require("../controllers/riceDiseaseController");


router.get("/rice-previous-predictions", getPreviousPredictions);

module.exports = router;
