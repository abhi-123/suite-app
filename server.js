const path = require('path');
const express = require('express');
const app = express();


const routes = require("./src/routes");

const port = process.env.PORT || 8080;

//Routes
app.use("/", routes);

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/images"));
// app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect CSS bootstrap
// app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect JS bootstrap
// app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist'));
const nm_dependencies = ['bootstrap', 'jquery', 'popper.js']; // keep adding required node_modules to this array.
nm_dependencies.forEach(dep => {
    app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)));
}); // redirect JS jquery

// Serve the files on port 3000.
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!\n`);
});