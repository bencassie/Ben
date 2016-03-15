/// <reference path="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js/>
 $(function() {
			Init();
		})
 		function Person(name){
 			this.name = name;
 		}
		function Init()
		{
            $.ajax({
            	url:'./hello',
            	dataType: 'json',
            	success: function(data, status, xhr) {
            		$('#outputDiv').text(JSON.stringify(data));
            	},
            	error: function(xhr, status, error) {
            		alert('error occured: ' + status);
            	}
            });            
		}
		// var b = $.parseJSON('{"name":"ben"}');
		// undefined
		// b
		// Object {name: "ben"}
		// JSON.stringify(b)
		// "{"name":"ben"}"