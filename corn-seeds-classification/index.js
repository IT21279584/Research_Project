const express = require("express");
const multer = require("multer");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const AWS = require("aws-sdk");
const Classification = require("./CornSeedsQualityClassification"); // Ensure path is correct
const FormData = require("form-data");
require("dotenv").config(); // Load environment variables

const app = express();
const upload = multer();
const PORT = 5000;

// Configure CORS
app.use(cors());

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// MongoDB and FastAPI URLs from environment variables
const MONGO_URI = process.env.MONGO_URI;
const FASTAPI_URL = process.env.FASTAPI_URL;

console.log(MONGO_URI);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Classification endpoint
app.post("/classify", upload.array("images", 2), async (req, res) => {
  try {
    if (!req.files || req.files.length !== 2) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 2 images" });
    }

    let highestClassification = "";
    let highestConfidence = 0.0;
    const imageUrls = [];
    const classifications = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const imageKey = `image0${i + 1}-${Date.now()}-${file.originalname}`;

      // Upload image to S3
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      imageUrls.push(uploadResult.Location);

      // Prepare image for FastAPI
      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send image to FastAPI for classification
      const response = await axios.post(FASTAPI_URL, formData, {
        headers: formData.getHeaders(),
      });

      const { classification, confidence } = response.data;
      classifications.push(classification);

      // Track the result with the highest confidence
      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        highestClassification = classification;
      }
    }

    // Save classification result to MongoDB
    const record = new Classification({
      imageUrls: imageUrls,
      classifications: classifications,
    });
    await record.save();

    // Send response with the highest confidence classification
    res.json({
      classification: highestClassification,
      confidence: highestConfidence,
    });
  } catch (error) {
    console.error("Error in /classify:", error);
    res
      .status(500)
      .json({ message: "Error classifying images", error: error.message });
  }
});


// Endpoint to fetch the last 4 classification records
// Endpoint to fetch last 4 records for previous results
app.get("/previous-results", async (req, res) => {
  try {
    const lastRecords = await Classification.find().sort({ _id: -1 }).limit(4);

    // Map results to contain only the first image and classification safely
    const formattedResults = lastRecords.map((record) => ({
      image: record.imageUrls && record.imageUrls[0] ? record.imageUrls[0] : null, // Use null if no image
      classification: record.classifications && record.classifications[0] ? record.classifications[0] : "Unknown", // Use "Unknown" if no classification
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching previous results:", error);
    res.status(500).json({ message: "Error fetching previous results" });
  }
});



// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
