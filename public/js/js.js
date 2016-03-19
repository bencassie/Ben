 $(function() {
        Init();
    });
    
    function Init()
    {
        debugger
        var url =  "http://UKLONLT441281.uk.db.com/report/5G/2016-03-16";
        $.getJSON(url + "?callback=?", null, function(report) {
            var b = report;
            // for(i in tweets) {
            //     tweet = tweets[i];
            //     $("#tweet-list").append(tweet.text + "<hr />");
            // }
        }, function(err) {
            var c = 1;
        });
        $.ajax({
            url:'http://UKLONLT441281.uk.db.com/report/5G/2016-03-16',
            dataType: 'jsonp',
            success: function(data, status, xhr) {
                $('#outputDiv').text(JSON.stringify(data) + 'Name = ' + data.report.name);
                //$('#outputDiv').text(data);
            },
            error: function(xhr, status, error) {
                $('#outputDiv').text('error occured: ' + status);
            }
        }); 
        var a = 1;           
    }
    // var b = $.parseJSON('{"name":"ben"}');
    // undefined
    // b
    // Object {name: "ben"}
    // JSON.stringify(b)
    // "{"name":"ben"}"