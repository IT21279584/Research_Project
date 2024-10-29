const express = require("express");
const multer = require("multer");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors"); // Import cors
const Classification = require("./CornSeedsQualityClassification"); // Ensure the path is correct
const FormData = require("form-data");

const app = express();
const upload = multer();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors()); // Allow all origins
// Or configure CORS with specific origins
// app.use(cors({ origin: "http://localhost:5173" }));

// MongoDB and FastAPI URLs
const MONGO_URI =
  "mongodb+srv://HansakaJS:hansaka123@cluster0.cbz0c3m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const FASTAPI_URL = "http://127.0.0.1:5001/classify";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Endpoint for classification
app.post("/classify", upload.array("images"), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image files provided" });
    }

    // Prepare to store classification results
    const classifications = [];
    const imageNames = [];
    const imageDatas = [];

    for (const file of req.files) {
      // Use FormData to create a multipart form with each file
      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      // Send the image to FastAPI server
      const response = await axios.post(FASTAPI_URL, formData, {
        headers: formData.getHeaders(),
      });

      const classification = response.data.classification;
      classifications.push(classification);
      imageNames.push(file.originalname);
      imageDatas.push(file.buffer);
    }

    // Save result to MongoDB with the image buffers
    const record = new Classification({
      imageNames,
      classifications,
      imageDatas,
    });
    await record.save();

    // Return the classification results
    res.json({ classifications });
  } catch (error) {
    console.error("Error in /classify:", error);
    res
      .status(500)
      .json({ message: "Error classifying images", error: error.message });
  }
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
