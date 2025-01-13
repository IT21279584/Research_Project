const Classification = require("../models/CornSeedsQualityClassification");

exports.getPreviousResults = async (req, res) => {
  try {
    // Fetch the last 2 classification records
    const lastRecords = await Classification.find().sort({ date: -1 }).limit(2);

    // Format the results to match the new schema
    const formattedResults = lastRecords.map((record) => ({
      images: record.imageUrls || [], // List of image URLs
      classifications: record.results || [], // Classification details
      finalPrediction: record.finalPrediction || {}, // Final prediction (label and confidence)
      date: record.date || null, // Date of classification
    }));

    // Send the formatted results in the response
    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching previous results:", error);
    res.status(500).json({
      message: "Error fetching previous results",
      error: error.message,
    });
  }
};
