 $(function() {
        Init();
    });
    
    function Init()
    {
        $.ajax({
            url:'/report/5G/2016-03-16',
            dataType: 'json',
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