const axios = require("axios");

const flaskClient = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

module.exports = flaskClient;
