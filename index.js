var express = require('express');
var app = express();

var server = app.listen(3000, function() {
	console.log('Server running');
});

app.use('/public', express.static('public'));

app.get('/hello', function (req, res) {
	//res.send('Hello world!');
	res.json({'hello':'wurzel'});
});
