const mongoose = require("mongoose");

const connectMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => {
      console.error("MongoDB connection error:", err.message);
      process.exit(1); // Exit process if MongoDB connection fails
    });
};

module.exports = connectMongoDB;
