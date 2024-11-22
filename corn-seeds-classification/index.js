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

app.post("/classify", upload.array("images", 2), async (req, res) => {
  try {
    if (!req.files || req.files.length !== 2) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 2 images" });
    }

    console.log("Received images:", req.files); // Log the uploaded files

    let highestClassification = "";
    let highestConfidence = 0.0;
    const imageUrls = [];
    const classifications = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const imageKey = `image0${i + 1}-${Date.now()}-${file.originalname}`;

      // Log the file being uploaded to S3
      console.log(`Uploading image ${i + 1} to S3:`, imageKey);

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

      // Log the S3 URL for the uploaded image
      console.log(
        `Image ${i + 1} uploaded to S3. URL: ${uploadResult.Location}`
      );

      // Prepare image for FastAPI
      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send image to FastAPI for classification
      console.log(`Sending image ${i + 1} to FastAPI for classification.`);
      const response = await axios.post(FASTAPI_URL, formData, {
        headers: formData.getHeaders(),
      });

      console.log(`FastAPI response for image ${i + 1}:`, response.data);

      const { classification, confidence } = response.data;
      classifications.push(classification);

      // Track the result with the highest confidence
      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        highestClassification = classification;
      }
    }

    // Log the highest classification and confidence result
    console.log("Highest Classification:", highestClassification);
    console.log("Highest Confidence:", highestConfidence);

    // Save classification result to MongoDB with highestClassification and highestConfidence
    const record = new Classification({
      imageUrls: imageUrls,
      classifications: classifications,
      highestClassification: highestClassification,
      highestConfidence: highestConfidence, // Store the highest classification and confidence
    });
    await record.save();

    // Log the saved record
    console.log("Classification result saved to MongoDB:", record);

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
// Fetch the last 2 records
// Fetch the last record with all associated images
app.get("/previous-results", async (req, res) => {
  try {
    // Fetch the last 2 records sorted by date in descending order
    const lastRecords = await Classification.find()
      .sort({ date: -1 }) // Sort by date field in descending order
      .limit(2);

    // Format the response to include all images and classifications for both records
    const formattedResults = lastRecords.map((record) => ({
      images: record.imageUrls || [], // Include all image URLs
      classifications: record.classifications || [], // Include all classifications
      highestClassification: record.highestClassification,
      date: record.date || null, // Include date if needed
    }));

    res.json(formattedResults); // Return the last 2 records
  } catch (error) {
    console.error("Error fetching previous results:", error);
    res.status(500).json({ message: "Error fetching previous results" });
  }
});







// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
