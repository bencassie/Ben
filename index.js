var express = require('express');
var app = express();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cats');


var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use('/public', express.static('public'));

var cats = require('./cat.js')(app);

var server = app.listen(3000, function() {
	console.log('Server running');
});


app.get('/hello', function (req, res) {
	res.json({'hello':'ben'});
});
