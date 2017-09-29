const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const keys = require('../../keys');
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
    app.listen(8081, function() {
        console.log('listening on IDE 8081');
    });
});

app.get('/', function(req, res){
    //res.sendFile('/home/ubuntu/workspace/' + 'index.ejs');
    //var cursor = db.collection('crud').find();
    //var test = ['what', "the", 'Hell'];
    db.collection('crud').find().toArray((err, results) => {
        if (err) console.log(err);
       //console.log(results);
       res.render('index.ejs', {crud: results});
    });
    //res.render('index.ejs', {crud: test});
});

app.post("/crud", (req, res) => {
    plays++;
    let test = new Date();
    let date = test.toString().substr(4,11);
    req.body.time = date;
    console.log(req.body);
    db.collection('crud').save(req.body, (err, result) => {
        if (err) console.log(err);
        console.log('Saved to DB');
        res.redirect('/');
    });
});

app.put('/crud', (req, res) => {
  db.collection('crud')
  .findOneAndUpdate({name: 'Bubba'},{
      //  {name: req.body.name}
    $set: {
        name: req.body.name,
        score: req.body.score,
      }
    },
    {
        sort: {_id:-1},
        upsert: true
    },
    (err, result) => {
        if (err) return res.send(err);
        res.send(result);
    });
});

app.delete('/crud', (req, res) => {
   db.collection('crud').findOneAndDelete(
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