const express = require('express');
const app = express();

const routes = require("./src/routes");

//Routes
app.use("/", routes);

app.use(express.static(__dirname + "/public"));

// Serve the files on port 3000.
app.listen(3000, function() {
    console.log('Example app listening on port 3000!\n');
});