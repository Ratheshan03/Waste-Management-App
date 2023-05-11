const axios = require("axios");

const flaskClient = axios.create({
  baseURL: "https://flask-yolov8-model.onrender.com",
  headers: { "Content-Type": "application/json" },
});

module.exports = flaskClient;
