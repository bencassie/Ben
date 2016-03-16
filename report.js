var _ = require('lodash');
var async = require('async');

var Report = require('./models/report.js');
module.exports = function(app) {

    /* Get by report/:name/:cob */
    app.get('/report/:name/:cob', function (req, res) {

    async.waterfall(
        [
            // Find
            function(callback) {
                Report.find({'name': req.params.name , 'cob' : req.params.cob }, function(err, report) {
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
                if (report.length > 0) {
                        res.json({info: 'report found successfully', data: report});
                    } else {
                        var newReport = new Report({'name' : req.params.name , 'cob' : req.params.cob, 'state' : 'start' });
                        newReport.save(function(err) {
                            if (err) {
                                res.json({info: 'error during save report', error: err});
                            }
                        }).then(function(report) {
                            res.json({info: 'report created successfully', data: report});
                        })
                }
            }
        ]);
    });
};
