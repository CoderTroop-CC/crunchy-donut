const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

// Connect
var uri = 'mongodb://dbuser:dbuser1@ds141786.mlab.com:41786/ranotes';

const connection = (closure) => {
    return MongoClient.connect(uri, (err, db) => {
        if (err) throw err;

        closure(db);
    });
};

// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

// Get users
router.get('/notes', (req, res) => {
    connection((db) => {
        db.collection('notes')
            .find()
            .toArray()
            .then((notes) => {
                response.data =notes;
                res.json(response);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;
