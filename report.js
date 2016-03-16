var _ = require('lodash');
var async = require('async');

var Report = require('./models/report.js');

getActions = function(state) {
    var transitions = {
        start : ['review', 'reject'],
        review : ['reject','addCommentary','approve'],
        addCommentary : ['addCommentary', 'review'],
        approve : ['accept','reject'],
        accept : [],
        reject : []
    }
    return transitions[state];
}

module.exports = function(app) {

    /* Get by report/:name/:cob */
    app.get('/report/:name/:cob', function (req, res) {
        async.waterfall(
        [
            // Find
            function(callback) {
                Report.findOne({'name': req.params.name , 'cob' : req.params.cob }, function(err, report) {
                    if (err) {
                        res.json({info: 'error during find report', error: err});
                    };
                }).then(function(report){
                    callback(null, report)
                });
            }
        ,
            // Return or Save
            function(report, callback) {
                if (report) {
                        callback(null, report);
                    } else {
                        var newReport = new Report({'name' : req.params.name , 'cob' : req.params.cob, 'state' : 'start' });
                        newReport.save(function(err) {
                            if (err) {
                                res.json({info: 'error during save report', error: err});
                            }
                        }).then(function(report) {
                            callback(null, report);
                        })
                }
            }
        ,
            // Assign transitions
            function(report, callback) {
                var actions = getActions(report.state);
                _.merge(report, { 'actions' : actions });
                res.json({info: 'ok', data: report});    
            }            
        ]);
    });
};
