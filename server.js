const path = require('path');
const express = require('express');
const port = process.env.PORT || 8080;
var bodyParser = require('body-parser'),
    app = express(),
    // http = require('http').Server(app),
    mongoose = require('mongoose'),
    promise;

const { countersSchema, urlSchema } = require("./src/db/model");
const routes = require("./src/routes");

// const mongoose = require("mongoose");
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};

// const mongoURI = "mongodb://localhost/url-shortner";
const MongoClient = require('mongodb').MongoClient;
const mongoURI = `mongodb+srv://abhi_saxena1809:ashanmol123@my-suite-app-cluster.prr8f.mongodb.net/<suite-app>?retryWrites=true&w=majority`
const client = new MongoClient(mongoURI, { useNewUrlParser: true, ...connectOptions });
promise = client.connect(err => {
  const collection = client.db("suite-app").collection("url-shortner");
  // perform actions on the collection object
  client.close();
});

// mongoose.Promise = global.Promise;
// promise = mongoose.connect(mongoURI, connectOptions, (err, db) => {
//     if (err) console.log(`Error`, err);
//     console.log(`Connected to MongoDB`);
// });

const URL = mongoose.model('URL', urlSchema);

promise.then(function(db) {
    console.log('connected!');
    URL.remove({}, function() {
        console.log('URL collection removed');
    })
    Counter.remove({}, function() {
        console.log('Counter collection removed');
        var counter = new Counter({ _id: ((Math.random() * 1e32 + 1) * Date.now()).toString(36).slice(2, 7), count: 10000 });
        counter.save(function(err) {
            if (err) return console.error(err);
            console.log('counter inserted');
        });
    });
});
// var countersSchema = new mongoose.Schema({
//     _id: { type: String, required: true },
//     count: { type: Number, default: 0 }
// });
// var Counter = mongoose.model('Counter', countersSchema);

// // URL Collection Schema
// var urlSchema = new mongoose.Schema({
//     _id: { type: String },
//     url: '',
//     created_at: ''
// });

const Counter = mongoose.model('Counter', countersSchema);


// URL Schema pre-save step
//
// This is run BEFORE a new document is persisted in the URL collection. All
// we are doing here is incrementing the counter in the Counter collection which
// then becomes the unique ID for the new document to be inserted in the URL
// collection
urlSchema.pre('save', function(next) {
    console.log('running pre-save');
    var doc = this;
    Counter.findByIdAndUpdate({ _id: doc._id }, { $inc: { count: 1 } }, function(err, counter) {
        if (err) return next(err);
        console.log(counter);
        console.log(counter.count);
        doc._id = counter.count;
        doc.created_at = new Date();
        console.log(doc);
        next();
    });
});

// const routes = require("./src/routes");
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Content-type,Accept,x-access-token,X-Key"
    );
    if (req.method == "OPTIONS") {
        res.status(200).end();
    } else {
        next();
    }
});

// ExpressJS middleware for serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use("/", routes);

// app.use(express.static(__dirname + "/public"));
console.log((__dirname + "/public/images"));

// app.use(express.static(__dirname + "/public/images/"));

// keep adding required node_modules to this array.
const nm_dependencies = ['bootstrap', 'jquery', 'popper.js'];
nm_dependencies.forEach(dep => {
    app.use(`/${dep}`, express.static(path.resolve(`node_modules/${dep}`)));
}); // redirect JS jquery

// Serve the files on port 3000.
app.listen(port, function() {
    console.log(`Example app listening on port ${port}!\n`);
});