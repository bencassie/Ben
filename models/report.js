var mongoose = require('mongoose');

var reportSchema = mongoose.Schema({
	name: String,
	cob: String,
    state: String,
    actions:[]
});

module.exports = mongoose.model('Report', reportSchema);
