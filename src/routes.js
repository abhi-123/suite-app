const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "index.html"));
});

router.get("/json-prettifier", (request, response) => {
    response.sendFile(path.join(__dirname, "views/json/json.html"));
});

module.exports = router;