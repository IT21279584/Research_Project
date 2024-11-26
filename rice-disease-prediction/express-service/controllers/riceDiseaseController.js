const uploadToS3 = require("../services/s3Service");
const classifyImage = require("../services/fastApiService");
const Classification = require("../models/RiceDiseasePrediction");

const riceDiseasePrediction = async (req, res) => {
  try {
    if (!req.files || req.files.length !== 1) {
      return res.status(400).json({ message: "Please upload exactly 1 image" });
    }

    
};

module.exports = { riceDiseasePrediction, getPreviousPredictions };
