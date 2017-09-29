$(document).ready(function(){
  
  $("#update").click(function(){
 	//instead of fetch, how can I use Ajax?
	fetch('score', {
	  method: 'put',
	  headers: {'Content-Type': 'application/json'},
	  body: JSON.stringify({
	  	//pass in variable...
	    'name': 'Bubba',
	    'score': '1,000,000'
	  })
	}).then(res => {
  		if (res.ok) return res.json()
	}).then(data => {
  		console.log(data)
	})
	
	$('h2').text('Fuck CodeSmith and FullStack and HR');

  });

  $("#testButton").click(function(){
  	//?name=Bubba why am I getting this as the url?
     var deleteName = $("#removeName").value;
     $("#ajax").text('Go F urself!');
    $(this).fadeOut(500).fadeIn(500)
  });
 
 /* 
  $("#delete").click(function(){
  	var deleteName = $("#removeName").value;
  	fetch('score', {
  		method: 'delete',
  		headers: {
  			'Content-Type': 'application/json'
  		},
  		body: JSON.stringify({
  			//pass in a variable, not static
  			'name': deleteName
  		})
  	}).then(function(res){
  		if (res.ok) return res.json();
  	}).then(function(data){
  		console.log(data);
  		window.location.reload();
  	})
  });
*/
});


