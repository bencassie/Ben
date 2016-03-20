 $(function() {
    refreshWorkflow();    
    });
    
    refreshWorkflow = function() {
        $.ajax({
            url:'http://localhost/report/5G/2016-03-16',
            dataType: 'json',
            success: function(data, status, xhr) {
                addWorkflowButtons(data)
            },
            error: function(xhr, status, error) {
                $('#header').text('error occured: ' + status);
            }
        });        
    }
    
    addWorkflowButtons = function(data) {
        $('#_id').text(data.report._id).hide();
        $('#header').html("<h1>" + data.report.name + " - " + data.report.cob + "</h1>" +
            "<h2>" + data.report.state + "</h2>");
        $(".workflowAction").remove();
        data.report.actions.forEach(function(action) {
           $("#workflow ul").append("<span class='workflowAction'" +
           "id='action" + action + 
           "' action='" + action + "'><li class='workflowLineItem'><a>" + action + "</a></li></span>");
        });
        
        $('.workflowAction').on('click', function(e,a) {
            transition(this.attributes.action.value);
        });
    }
    
    transition = function(targetState) {
        $.ajax({
            url: 'http://localhost/report/' + $('#_id').text(), 
            dataType: 'json',
            type: 'put',
            data: {"state": targetState},                    
            success: function(data, status, xhr) {
                addWorkflowButtons(data);
            },
            error: function(xhr, status, error) {
                $('#outputDiv').text('error occured: ' + status);
            }
        });         
    }
    // var b = $.parseJSON('{"name":"ben"}');
    // undefined
    // b
    // Object {name: "ben"}
    // JSON.stringify(b)
    // "{"name":"ben"}"