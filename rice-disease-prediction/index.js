const express = require("express");
const multer = require("multer");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const AWS = require("aws-sdk");
const Classification = require("./RiceDiseasePrediction"); // Ensure path is correct
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

app.post(
  "/rice_disease_prediction",
  upload.array("images", 1),
  async (req, res) => {
    try {
      if (!req.files || req.files.length !== 1) {
        return res
          .status(400)
          .json({ message: "Please upload exactly 1 image" }); // Updated validation message
      }

      console.log("Received image:", req.files); // Log the uploaded file

      const file = req.files[0]; // Only process the first file, since we're expecting one
      const imageKey = `image-${Date.now()}-${file.originalname}`;

      // Log the file being uploaded to S3
      console.log(`Uploading image to S3:`, imageKey);

      // Upload image to S3
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      const imageUrl = uploadResult.Location; // S3 URL for the uploaded image
      console.log(`Image uploaded to S3. URL: ${uploadResult.Location}`);

      // Prepare image for FastAPI
      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send image to FastAPI for classification
      console.log(`Sending image to FastAPI for classification.`);
      const response = await axios.post(FASTAPI_URL, formData, {
        headers: formData.getHeaders(),
      });

      console.log(`FastAPI response for image:`, response.data);

      const { prediction } = response.data; // Receive prediction from FastAPI

      // Save classification result to MongoDB
      const record = new Classification({
        imageUrls: [imageUrl], // Store a single image URL
        predictions: [prediction], // Store a single prediction result
      });
      await record.save();

      // Log the saved record
      console.log("Classification result saved to MongoDB:", record);

      // Send response with the prediction
      res.json({
        prediction: [prediction], // Return a single prediction
      });
    } catch (error) {
      console.error("Error in /rice_disease_prediction:", error);
      res
        .status(500)
        .json({ message: "Error classifying image", error: error.message });
    }
  }
);

// Endpoint to fetch the last 4 classification records
app.get("/rice_prediction_previous_results", async (req, res) => {
  try {
    // Fetch the last 4 records sorted by date in descending order
    const lastRecords = await Classification.find()
      .sort({ date: -1 }) // Sort by date field in descending order
      .limit(4);

    // Format the response to include all images and predictions for both records
    const formattedResults = lastRecords.map((record) => ({
      images: record.imageUrls || [], // Include all image URLs
      predictions: record.predictions || [], // Include all predictions
      date: record.date || null, // Include date if needed
    }));

    res.json(formattedResults); // Return the last 4 records
  } catch (error) {
    console.error("Error fetching previous results:", error);
    res.status(500).json({ message: "Error fetching previous results" });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
