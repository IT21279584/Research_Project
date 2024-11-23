const Classification = require("../models/SoybeanSeedsQualityClassification");

exports.getPreviousResults = async (req, res) => {
  try {
    const lastRecords = await Classification.find().sort({ date: -1 }).limit(2);

    const formattedResults = lastRecords.map((record) => ({
      images: record.imageUrls || [],
      classifications: record.classifications || [],
      highestClassification: record.highestClassification,
      date: record.date || null,
    }));

    res.json(formattedResults);
  } catch (error) {
    console.error("Error fetching previous results:", error);
    res.status(500).json({
      message: "Error fetching previous results",
      error: error.message,
    });
  }
};
