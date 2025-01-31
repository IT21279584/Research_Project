// config/s3Config.js
const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// Function to upload a file to S3
const uploadToS3 = async (file, imageKey) => {
  try {
    const uploadResult = await s3
      .upload({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: imageKey,
        Body: file.buffer,
        ContentType: file.mimetype,
      })
      .promise();

    return uploadResult.Location; // Return the S3 URL of the uploaded file
  } catch (err) {
    throw new Error("Error uploading image to S3: " + err.message);
  }
};

module.exports = { s3, uploadToS3 };
