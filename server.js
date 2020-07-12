const path = require('path');
const express = require('express');
var jsdom = require('jsdom');
$ = require('jquery')(new jsdom.JSDOM().window);
// const $ = (require('jquery'));
// var $ = require('jquery')(require("jsdom").jsdom().parentWindow);
// require('./public/js/models/UrlShorten')
const port = process.env.PORT || 8080;
var bodyParser = require('body-parser'),
    app = express(),
    // http = require('http').Server(app),
    mongoose = require('mongoose'),
    btoa = require('btoa'),
    atob = require('atob'),
    promise;
const mongoURI = "mongodb://localhost/url-shortner";
// const mongoose = require("mongoose");
const connectOptions = {
    keepAlive: true,
    reconnectTries: Number.MAX_VALUE
};
mongoose.Promise = global.Promise;
promise = mongoose.connect(mongoURI, connectOptions, (err, db) => {
    if (err) console.log(`Error`, er);
    console.log(`Connected to MongoDB`);
});


promise.then(function(db) {
    console.log('connected!');
    URL.remove({}, function() {
        console.log('URL collection removed');
    })
    Counter.remove({}, function() {
        console.log('Counter collection removed');
        var counter = new Counter({ count: 10000 });
        counter.save(function(err) {
            if (err) return console.error(err);
            console.log('counter inserted');
        });
    });
});
var countersSchema = new mongoose.Schema({
    // _id: { type: String, required: true },
    count: { type: Number, default: 0 }
});
var Counter = mongoose.model('Counter', countersSchema);

// URL Collection Schema
var urlSchema = new mongoose.Schema({
    // _id: { type: Number },
    url: '',
    created_at: ''
});

var URL = mongoose.model('URL', urlSchema);


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

// const app = express();
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
//Routes
// app.use("/", routes);

// ExpressJS middleware for serving static files
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
    extended: true
}));

// Base route for front-end
app.get('/', function(req, res) {
    res.sendFile('src/views/index.html', {
        root: __dirname
    });
})

app.get("/json-prettifier", (request, response) => {
    response.sendFile(path.join(__dirname, "src/views/json/json.html"));
});

app.get("/url-shortner", (request, response) => {
    response.sendFile(path.join(__dirname, "src/views/url/url.html"));
});


app.post('/shorten', function(req, res, next) {
    console.log(req.body.url);
    var urlData = req.body.url;
    URL.findOne({ url: urlData }, function(err, doc) {
        if (doc) {
            console.log('entry found in db');
            res.send({
                url: urlData,
                hash: btoa(doc._id),
                status: 200,
                statusTxt: 'OK'
            });
        } else {
            console.log('entry NOT found in db, saving new');
            var url = new URL({
                url: urlData
            });
            url.save(function(err) {
                if (err) return console.error(err);
                res.send({
                    url: urlData,
                    hash: btoa(url._id),
                    status: 200,
                    statusTxt: 'OK'
                });
            });
        }
    });
});

app.get('/:hash', function(req, res) {
    var baseid = req.params.hash;
    var id = atob(baseid);
    URL.findOne({ _id: id }, function(err, doc) {
        if (doc) {
            res.redirect(doc.url);
        } else {
            res.redirect('/');
        }
    });
});

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