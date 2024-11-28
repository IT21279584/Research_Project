const s3 = require("../config/s3Config");

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

    return uploadResult.Location;
  } catch (err) {
    throw new Error("Error uploading image to S3: " + err.message);
  }
};

module.exports = uploadToS3;
