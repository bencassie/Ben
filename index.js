// Set up express
var express = require('express');
var app = express();
// cors
var cors = require('cors');
app.use(cors());
app.options('*', cors());
// Set up mongo
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');
// Set up parser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
// Set up form website
app.use('/public', express.static('public'));
// Start node server
var report = require('./report.js')(app);
var server = app.listen(80, function() {
	console.log('Server running');
});

// app.get('/hello', function (req, res) {
// 	res.json({'hello':'world'});
// });
