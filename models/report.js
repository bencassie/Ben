var m = require('mongoose');

var reportSchema = m.Schema({
	name: String,
	cob: String,
    state: String,
    actions:[]
});

module.exports = m.model('Report', reportSchema);
