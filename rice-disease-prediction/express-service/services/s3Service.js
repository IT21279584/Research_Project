const s3 = require("../config/s3Config");

const uploadToS3 = async (file, imageKey) => {
  

    return uploadResult.Location;
  } catch (err) {
    throw new Error("Error uploading image to S3: " + err.message);
  }
};

module.exports = uploadToS3;
