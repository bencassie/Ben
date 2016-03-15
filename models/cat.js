var mongoose = require('mongoose');

var catSchema = mongoose.Schema({
	id: Number,
    name: String,
    age: Number,
    type: String

});

module.exports = mongoose.model('Cat', catSchema);
