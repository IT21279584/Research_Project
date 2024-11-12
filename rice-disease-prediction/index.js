const express = require("express");
const multer = require("multer");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const AWS = require("aws-sdk");
const Classification = require("./models/RiceDiseasePrediction"); // Ensure path is correct
const FormData = require("form-data");
require("dotenv").config(); // Load environment variables

const app = express();
const upload = multer();
const PORT = process.env.PORT;

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

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// POST endpoint for rice disease prediction
app.post(
  "/rice-disease-predictions",
  upload.array("images", 1),
  async (req, res) => {
    try {
      // Validate file upload
      if (!req.files || req.files.length !== 1) {
        return res
          .status(400)
          .json({ message: "Please upload exactly 1 image" });
      }

      const file = req.files[0];
      const imageKey = `image-${Date.now()}-${file.originalname}`;

      console.log(`Uploading image to S3: ${imageKey}`);

      // Upload image to S3
      let uploadResult;
      try {
        uploadResult = await s3
          .upload({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: imageKey,
            Body: file.buffer,
            ContentType: file.mimetype,
          })
          .promise();
      } catch (err) {
        console.error("Error uploading image to S3:", err.message);
        return res.status(500).json({
          message: "Failed to upload image to S3",
          error: err.message,
        });
      }

      const imageUrl = uploadResult.Location;

      // Prepare formData for FastAPI
      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send image to FastAPI for classification
      let response;
      try {
        response = await axios.post(FASTAPI_URL, formData, {
          headers: formData.getHeaders(),
        });
      } catch (err) {
        console.error("Error calling FastAPI:", err.message);
        return res.status(500).json({
          message: "Failed to classify the image using FastAPI",
          error: err.message,
        });
      }

      const { prediction } = response.data;

      // Save classification result to MongoDB
      const record = new Classification({
        imageUrls: [imageUrl],
        predictions: [prediction],
      });

      try {
        await record.save();
      } catch (err) {
        console.error("Error saving prediction to MongoDB:", err.message);
        return res.status(500).json({
          message: "Failed to save prediction result",
          error: err.message,
        });
      }

      // Respond with the prediction
      res.json({ prediction: [prediction] });
    } catch (err) {
      console.error("Error with prediction:", err.message);
      res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }
  }
);

// GET endpoint for fetching previous classification results
app.get("/rice-previous-predictions", async (req, res) => {
  try {
    const lastRecords = await Classification.find().sort({ date: -1 }).limit(4);

    const formattedResults = lastRecords.map((record) => ({
      images: record.imageUrls || [],
      predictions: record.predictions || [],
      date: record.date || null,
    }));

    res.json(formattedResults);
  } catch (err) {
    console.error("Error fetching previous results:", err.message);
    res
      .status(500)
      .json({ message: "Error fetching previous results", error: err.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
