// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');
app = express();
const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);
var port = process.env.PORT || 5001;

//dependencies

const nconf = require('nconf');
const Multer = require('multer');
const bodyParser = require('body-parser');

//mongoDB Setup

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://atlasAdmin:Taereth9594&@cluster0-0nxjb.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const assert = require('assert');

//make requests readable for Server
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

//Fallback


app.listen(port);
console.log('server started '+ port);

//test

let dbName = "test";


//Server Listener

app.get("/test", function (req,res){
  res.json({status: 'testing', 'bibel': 'bobel'});
  console.log("bah");
})


//New User Registration, pushing data to mongoDB
//TODO ERROR if no data sent
app.post("/newuser",function (req,res){

  storeIntoMongoDB(req.body,"users");


})

//Checking whether Email and Password are in the MongoDB, if they are, returns Email and Password to the Client

app.post("/checklogin",function (req,res){

  console.log(req.body);

  var theemail = req.body['email'];

  var theuser = {
    email : theemail
  }

  console.log(theuser);

//Functions to run when the user exists in the database

  function iterateFunc(doc) {


    res.json(doc);

    client.close();

  }
  function errorFunc(error) {
    console.log(error);
  }



  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);
    const collection = db.collection("users");

    var cursor = collection.find(theuser);



    cursor.count(function(err, count) {
    if(count == 1) {
      cursor.forEach(iterateFunc,errorFunc);
    }

    else if(count == 0){
      res.json({status:'Incorrect Email'});
      client.close();
    }

    else{
      res.json({status:'DB Error'});
      client.close();
    }
});


  })

})

app.post("/currentuser",function (req,res){

  console.log(req.body);

  var id = req.body['id'].toString();


  console.log(id);

//Functions to run when the user exists in the database

  function iterateFunc(doc) {

    console.log(doc)


    res.json(doc);

    client.close();

  }
  function errorFunc(error) {
    console.log(error);
  }


  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);
    const collection = db.collection("users");

    var cursor = collection.find({id: id});



    cursor.count(function(err, count) {
    if(count == 1) {
      cursor.forEach(iterateFunc,errorFunc);
    }

    else if(count == 0){
      res.json({status:'No Id Found'});
      client.close();
    }

    else{
      res.json({status:'DB Error'});
      client.close();
    }
});


  })

})

//Function to store any Object into mongoDB -> Made in previous project ( https://github.com/Taereth/InstantFeed )

function storeIntoMongoDB(object, collectionName) {


  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    collection.insertOne(object, (err, result) =>{
      if (err){
        throw err;
      }
      client.close();

    })

  })

}
