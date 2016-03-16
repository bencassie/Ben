 $(function() {
			Init();
		})
 		function Person(name){
 			this.name = name;
 		}
		function Init()
		{
            $.ajax({
            	url:'/cat',
            	dataType: 'json',
            	success: function(data, status, xhr) {
            		$('#outputDiv').text(JSON.stringify(data));
            		//$('#outputDiv').text(data);
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