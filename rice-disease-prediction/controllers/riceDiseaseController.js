const uploadToS3 = require("../services/s3Service");
const classifyImage = require("../services/fastApiService");
const Classification = require("../models/RiceDiseasePrediction");

const riceDiseasePrediction = async (req, res) => {
  try {
    if (!req.files || req.files.length !== 1) {
      return res.status(400).json({ message: "Please upload exactly 1 image" });
    }

    const file = req.files[0];
    const imageKey = `image-${Date.now()}-${file.originalname}`;
    console.log(`Uploading image to S3: ${imageKey}`);

    const imageUrl = await uploadToS3(file, imageKey);

    const prediction = await classifyImage(file);

    const record = new Classification({
      imageUrls: [imageUrl],
      predictions: [prediction],
    });

    await record.save();
    res.json({ prediction: [prediction] });
  } catch (err) {
    console.error("Error with prediction:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error detected", error: err.message });
  }
};



module.exports = { riceDiseasePrediction, getPreviousPredictions };
