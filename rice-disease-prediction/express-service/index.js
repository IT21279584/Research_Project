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
  .connect(MONGO_URI, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process if MongoDB connection fails
  });

// POST endpoint for rice disease prediction
app.post(
  "/api/rice-disease-predictions",
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

      
});
