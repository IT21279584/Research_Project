const axios = require("axios");
require("dotenv").config();

const fastapiInstance = axios.create({
  baseURL: process.env.FASTAPI_URL,
});

module.exports = fastapiInstance;
