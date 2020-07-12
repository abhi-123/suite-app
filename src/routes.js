const express = require("express");
const router = express.Router();
const path = require("path");

const mongoose = require('mongoose');
const btoa = require('btoa');
const atob = require('atob');
const { countersSchema, urlSchema } = require("./db/model");
const URL = mongoose.model('URL', urlSchema);


// Base route for front-end
router.get('/', function(req, res) {
    res.sendFile('views/index.html', {
        root: __dirname
    });
})

router.get("/json-prettifier", (request, response) => {
    response.sendFile(path.join(__dirname, "views/json/json.html"));
});

router.get("/url-shortner", (request, response) => {
    response.sendFile(path.join(__dirname, "views/url/url.html"));
});


router.post('/shorten', function(req, res, next) {
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
                url: urlData,
                _id: ((Math.random() * 1e32 + 1) * Date.now()).toString(36).slice(2, 7)
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

router.get('/:hash', function(req, res) {
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

module.exports = router;