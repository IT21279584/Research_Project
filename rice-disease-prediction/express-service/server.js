const express = require("express");
const cors = require("cors");
const connectMongoDB = require("./config/mongooseConfig");
const riceDiseaseRoutes = require("./routes/riceDiseaseRoutes");
require("dotenv").config(); // Load environment variables

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectMongoDB();

// Set up routes
app.use("/api", riceDiseaseRoutes);

// Start Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
