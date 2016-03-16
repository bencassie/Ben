var _ = require('lodash');

var Cat = require('./models/cat.js');
module.exports = function(app) {

    /* Get by :id */
    app.get('/report/:id', function (req, res) {
        Cat.findById(req.params.id, function(err, cat) {
            if (err) {
                res.json({info: 'error during find cat', error: err});
            };
            if (cat) {
                 res.json({info: 'cat found successfully', data: cat});
            } else {
                res.json({info: 'cat not found'});
            }
        });
    });



};
