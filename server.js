const express = require('express');
const app = express();

const routes = require("./src/routes");

const port = process.env.PORT || 8080;

//Routes
app.use("/", routes);

app.use(express.static(__dirname + "/public"));

// Serve the files on port 3000.
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!\n`);
});
