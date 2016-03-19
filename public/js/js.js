 $(function() {
        Init();
    });
    
    function Init()
    {
        $.ajax({
            url:'http://ben.db.com/report/5G/2016-03-16',
            dataType: 'json',
            success: function(data, status, xhr) {
                var output = JSON.stringify(data) + 'Name = ' + data.report.name;
                $('#outputDiv').text(output);
                // $.ajax({
                //     url: 'http://ben.db.com/report/' + data.report._id,
                //     dataType: 'json',
                //     type: 'put',
                //     data: {"state":"review"},                    
                //     success: function(data, status, xhr) {
                //         $('#outputDiv').text(output + JSON.stringify(data) + 'Name = ' + data.report.name);
                //         //$('#outputDiv').text(data);
                //     },
                //     error: function(xhr, status, error) {
                //         $('#outputDiv').text('error occured: ' + status);
                //     }
                // }); 
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