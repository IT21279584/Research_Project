const axios = require("axios");
const FormData = require("form-data");

const FASTAPI_URL = process.env.FASTAPI_URL;

const classifyImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file.buffer, {
    filename: file.originalname,
    contentType: file.mimetype,
  });

  
};

module.exports = classifyImage;
