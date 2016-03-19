var _ = require('lodash');
var async = require('async');

var Report = require('./models/report.js');

getActions = function(state) {
    var transitions = {
        preparing : ['review', 'reject'],
        review : ['preparing', 'reject','addCommentary','approve'],
        addCommentary : ['addCommentary', 'review'],
        approve : ['accept','review', 'reject'],
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
                        var newReport = new Report({'name' : req.params.name , 'cob' : req.params.cob, 'state' : 'preparing' });
                        newReport.actions = getActions(newReport.state);
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
                //if a json callback was provided in the query string
                var response = {info: 'ok', report: report};
               
                res.jsonp(response);    
            }            
        ]);
    });




    /* Update */
    app.put('/report/:id', function (req, res) {
        Report.findById(req.params.id, function(err, report) {
            if (err | !report) {
                res.json({info: 'error during find report', error: err});
            } else {                
                var actions = getActions(req.body.state);
                if (actions != null) {
                    report.state = req.body.state;
                    report.actions = actions;
                    report.save(function(err) {
                        if (err) {
                            res.json({info: 'error during report update', error: err});
                        };
                        res.json({info: 'report updated successfully', report : report});
                    });
                } else {
                    res.json({error: 'invalid transition', requestedState : req.body.state, report : report});
                }
            }

        });
    });
};
