var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

app.use(morgan('dev'));

// retrieve POST data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//ROUTES
var topics = require('./routes/topics');
app.use('/api/topics', topics);
var users = require('./routes/users');
app.use('/api/users', users);

//404
app.use(function(req, res, next) {
    var err = new Error('Resource not found');
    err.status = 404;
    next(err);
});
app.use(function(err, req, res, next) {

    // ADD if auth error, wrong or expired token
    if (err.name === 'UnauthorizedError') {
        res.status(403).json({message: "Not authorized"});
        return;
    }

    console.error("["+(err.status || 500)+"] "+(new Date()).toString()+" "+req.url +' '+ err);
    var message = err.status == 404 ? err.message : "Unknown error";
    res.status(err.status || 500).json({
        status: err.status || 500,
        message: message //should by default hide in production
    });
});

process.on('uncaughtException', function (err) {
    console.error((new Date()).toString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

module.exports = app;
