//tutorial https://zellwk.com/blog/crud-express-mongodb/
//db pw tony/simon

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../keys');
var db;

MongoClient.connect(keys.mongoDB, function (err, database){
	if (err) return console.log(err);
	db = database;
	app.listen(3000, function(){
		console.log('Server Up and Running Biotch!');
	});
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(bodyParser.json());

//Old html before redering with ejs....
//run nodemon --> TonyR:crud bigxshowx$ nodemon server.js 
//app.get('/', function(req, res) {
//	res.sendFile('/Users/bigxshowx/coding/javaScript/crud/' + 'crud.html');
//})

app.get('/', function(req, res){
	db.collection('score').find().toArray(function(err, results){
		if (err) return console.log(err);
		//renders index.ejs
		res.render('index.ejs', {score: results});
	});
});

//app.post('/score', function (req, res){
app.post('/score', function (req, res){
	db.collection('score').save(req.body, function(err, result){
		if (err) return console.log(err);
		console.log('Saved to Database!');
		res.redirect('/');
	});
});

app.put('/score', function(req, res){
  db.collection('score').findOneAndUpdate({name: 'pepsi'}, {
  	$set: {
    name: req.body.name,
    score: req.body.score
  	}
  }, {
  	sort: {_id: -1},
    upsert: true
  }, function (err, result){
  	if (err) return res.send(err);
  	res.send(result);
  	//how to a trigger another get request to render the page with the new updates
  	res.redirect('/');
  });
});

app.delete('/score', function(req, res){
	db.collection('score').findOneAndDelete(req.body, function(err, result){
			if (err) return res.send(500, err);
			console.log('Score Deleted...')
			res.redirect('/');
	});
});

