const axios = require("axios");
const FormData = require("form-data");
const { FASTAPI_URL } = require("../config/fastApiConfig");

const classifyImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  try {
    const response = await axios.post(FASTAPI_URL, formData, {
      headers: formData.getHeaders(),
    });
    return response.data.prediction;
  } catch (err) {
    throw new Error("Error calling FastAPI: " + err.message);
  }
};

module.exports = classifyImage;
