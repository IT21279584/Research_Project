const s3 = require("../config/aws");
const Classification = require("../../models/CornSeedsQualityClassification");
const fastapiInstance = require("../config/fastapi");
const FormData = require("form-data");

exports.classifyImages = async (req, res) => {
  try {
    if (!req.files || req.files.length !== 2) {
      return res
        .status(400)
        .json({ message: "Please upload exactly 2 images" });
    }

    let highestClassification = "";
    let highestConfidence = 0.0;
    const imageUrls = [];
    const classifications = [];

    for (const file of req.files) {
      const imageKey = `image-${Date.now()}-${file.originalname}`;

      const uploadResult = await s3
        .upload({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: imageKey,
          Body: file.buffer,
          ContentType: file.mimetype,
        })
        .promise();

      imageUrls.push(uploadResult.Location);

      const formData = new FormData();
      formData.append("file", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });

      const response = await fastapiInstance.post("/", formData, {
        headers: formData.getHeaders(),
      });

      const { classification, confidence } = response.data;
      classifications.push(classification);

      if (confidence > highestConfidence) {
        highestConfidence = confidence;
        highestClassification = classification;
      }
    }

    const record = new Classification({
      imageUrls,
      classifications,
      highestClassification,
      highestConfidence,
    });
    await record.save();

    res.json({
      classification: highestClassification,
      confidence: highestConfidence,
    });
  } catch (error) {
    console.error("Error in classifyImages:", error);
    res
      .status(500)
      .json({ message: "Error classifying images", error: error.message });
  }
};
