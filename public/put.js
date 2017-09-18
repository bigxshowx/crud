const http = new XMLHttpRequest();
const url = 'https://jsonplaceholder.typicode.com/posts';
var test;
var i = 0;

http.onreadystatechange = function() {
  if (http.readyState === 4 && http.status === 200){
     test = (JSON.parse(http.responseText)[3].body).substr(1,10);
     var text = document.getElementById('fts');
     text.innerHTML = '------>' + test + ' ' + i++;
     console.log(test);
  } else if (http.readyState === http.DONE && http.status !== 200) {
     console.log('Error!');
  }
};

var update = document.getElementById('update');
update.addEventListener('click', function(){
    //http.open(method, url);
    //http.send();
    fetch('crud', {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Mike Tyson',
            'score': 'I want to eat your Children!'
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(data => {
        console.log(data);
        //input some react here to update the DOM dynamically!!
        window.location.reload(true);
    });
});

var del = document.getElementById('delete');
del.addEventListener('click', function(){
    fetch('crud', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': 'Mike Tyson',
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(data => {
        console.log(data);
        //input some react here to update the DOM dynamically!!
        window.location.reload(true);
        alert(data.message);
    });
});

var delForm = document.getElementById('delForm');
var delButton = document.getElementById('delButton');
delButton.addEventListener('click', function(){
    fetch('crud', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            'name': delForm.value,
        })
    }).then(res => {
        if (res.ok) return res.json();
    }).then(data => {
        console.log(data);
        //input some react here to update the DOM dynamically!!
        window.location.reload(true);
        setTimeout(() => alert(data.message), 1000);
    });
});

function sendAJAX(){
  //For form inputvalue, use below code:
  //var zip = document.getElementById('zip').value;
  http.open('GET', url);
  http.send();
  console.log('working');
}
