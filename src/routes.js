const express = require("express");
const router = express.Router();
const path = require("path");


router.get("/", (request, response) => {
    response.sendFile("index.html");
})

router.get("/test", (request, response) => {
    response.sendFile(path.join(__dirname, "test/test.html"));
})

module.exports = router;