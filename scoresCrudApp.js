const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const keys = require('./keys');
let db;
let plays;

//https://ide50-tony-rr.cs50.io:8081
//apache50 start / , apache50 stop
//https://zellwk.com/blog/crud-express-and-mongodb-2/

app.use(bodyParser.urlencoded({extended: true}));
 //our put request will send the body as a JSON (via stringify) this middle ware allows our server to read it
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

MongoClient.connect(keys.mongoDB, (err, database) => {
    if (err) console.log(err);
    db = database;
    //server start
    app.listen(3000, function() {
        console.log('listening on 3000');
    });
});

app.get('/', function(req, res){
    //res.sendFile('/home/ubuntu/workspace/' + 'index.ejs');
    //var cursor = db.collection('crud').find();
    //var test = ['what', "the", 'Hell'];
    db.collection('crud_random').find().toArray((err, results) => {
        if (err) console.log(err);
       //console.log(results);
       res.render('scores.ejs', {score: results});
    });
    //res.render('index.ejs', {crud: test});
});

app.post("/score", (req, res) => {
    plays++;
    let setDate = new Date();
    let date = setDate.toString().substr(4,11);
    req.body.time = date;
    console.log(req.body);
    db.collection('crud_random').save(req.body, (err, result) => {
        if (err) console.log(err);
        console.log('Saved to DB');
        res.redirect('/');
    });
});

app.put('/scores', (req, res) => {
  console.log(req.body);
  db.collection('crud_random')
  .findOneAndUpdate({name: req.body.name},{
      //  {name: req.body.name}
    $set: {
        score: req.body.score
      }
    },
    {
        sort: {_id:-1},
        upsert: true
    },
    (err, result) => {
        if (err) return res.send(err);
        res.send(result);
        //res.send({message: 'sending from the server!'});
    });
});

app.delete('/scores', (req, res) => {
   console.log('F the ' + req.body.name);
   db.collection('crud_random').findOneAndDelete(
       {name: req.body.name},
       //find way to sort the score values instead of entry ID...
       {sort: {_id: -1} },
       function(err, result){
           if (err) return res.send(500, err);
           //what other types of things can we send as the result?
           res.send({message: "\"" + req.body.name + "\"" + ' Entry has been deleted'});
       });
});

//build server side AJAX Req response which returns the JSON db Array's length