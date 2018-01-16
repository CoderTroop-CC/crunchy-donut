const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const mongoose = require('mongoose');

// Connect
var url = 'mongodb://dbuser:dbuser1@ds141786.mlab.com:41786/ranotes';

const connection = (closure) => {
    return MongoClient.connect(url, (err, db) => {
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

// Get notes
router.get('/notes', (req, res) => {
    connection((db) => {
        db.collection('notes')
            .find()
            .toArray()
            .then((notes) => {
                response.data = notes;
                res.json(notes);
                console.log(notes);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get comments
router.get('/comments', (req, res) => {
    connection((db) => {
        db.collection('comments')
            .find()
            .toArray()
            .then((comments) => {
                response.data = comments;
                res.json(comments);
                console.log(comments);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

// Get users
router.get('/users', (req, res) => {
    connection((db) => {
        db.collection('users')
            .find()
            .toArray()
            .then((users) => {
                response.data = users;
                res.json(users);
                console.log(users);
            })
            .catch((err) => {
                sendError(err, res);
            });
    });
});

module.exports = router;