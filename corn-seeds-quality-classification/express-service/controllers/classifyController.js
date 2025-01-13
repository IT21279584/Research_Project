const s3 = require("../config/aws");
const Classification = require("../models/CornSeedsQualityClassification");
const axios = require("axios"); // Using Axios for HTTP requests
const FormData = require("form-data");

exports.classifyImages = async (req, res) => {
  try {
    if (!req.files || req.files.length !== 2) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 2 images" });
    }

    const imageUrls = [];
    const formData = new FormData();

    for (const file of req.files) {
      const imageKey = `image-${Date.now()}-${file.originalname}`;

      // Upload to S3
      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      imageUrls.push(uploadResult.Location);

      // Append each file to FormData
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    }

    // Send images to Flask API
    const flaskResponse = await axios.post(process.env.FASTAPI_URL, formData, {
      headers: formData.getHeaders(),
    });

    const { final_prediction, results } = flaskResponse.data;

    // Save to MongoDB
    const record = new Classification({
      imageUrls,
      results,
      finalPrediction: final_prediction,
    });

    await record.save();

    // Respond with final prediction and results
    res.json({
      finalPrediction: final_prediction,
      results,
    });
  } catch (error) {
    console.error("Error in classifyImages:", error);
    res
      .status(500)
      .json({ message: "Error classifying images", error: error.message });
  }
};
