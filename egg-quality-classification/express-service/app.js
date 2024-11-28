// app.js
require('dotenv').config();
const express = require('express');
const cors = require('cors'); // Import CORS
const connectDB = require('./config/db');
const predictionRoutes = require('./routes/predictionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
connectDB();

// Serve the uploads folder as static
app.use('/uploads', express.static('uploads'));

// Use routes
app.use('/api', predictionRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
