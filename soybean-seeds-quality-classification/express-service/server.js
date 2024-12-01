const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

// Routes
const classifyRoutes = require("./routes/soybeanClassifyRoutes");
const resultRoutes = require("./routes/soybeanPreviousResultRoutes");

// Initialize Express App
const app = express();

// Middleware
app.use(cors());

// Routes
app.use("/api/soybean-quality-classification", classifyRoutes);
app.use("/api/soybean-previous-results", resultRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {});
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1); // Exit process on failure
  }
};

// Start Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB(); // Ensure MongoDB connection before starting the server
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
