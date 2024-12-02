const express = require("express");
const cors = require("cors");
require("dotenv").config();

const mongooseConfig = require("./config/mongooseConfig");
const riceDiseaseRoutes = require("./routes/riceDiseaseRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Configure Middleware
app.use(cors());
app.use(express.json());

// MongoDB Configuration
mongooseConfig();

// API Routes
app.use("/api", riceDiseaseRoutes);

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
