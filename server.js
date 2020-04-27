// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
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

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://atlasAdmin:Taereth9594&@cluster0-0nxjb.mongodb.net/test?retryWrites=true&w=majority"
const client = new MongoClient(uri);
const assert = require('assert');
const mongoose = require('mongoose');
const ObjectID = mongodb.ObjectID;

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
  res.status(200).send({ auth: true })


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

    res.status(200).send({ auth: true, user: doc });
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
      res.status(404).send("User not found.");
      client.close();
    }

    else{
      res.status(500).send("DB Error");
      client.close();
    }
});


  })

})

app.post("/currentuser",function (req,res){


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

app.post("/updateUserDB",function (req,res){

  var dbid = req.body.id;
  var payload = req.body.payload;

  console.log(req.body);

  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);
    const collection = db.collection("users");

    collection.updateOne({_id: new ObjectID(dbid)},{$set:
      {
        "email":payload.email,
        "vorname":payload.vorname,
        "nachname":payload.nachname,
        "gender":payload.gender,
        "wohnort":payload.wohnort,
        "job":payload.job
      }
    },{upsert: true}, (err, result) =>{
      if (err){
        throw err;
      }
      client.close();

    })

  })


})

app.get("/allusers",function (req,res){

  var users=[];


  MongoClient.connect(uri, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err;
    
    const db = client.db(dbName)
    const collection = db.collection("users")

	var cursor = collection.find()
	
	let users = await cursor.toArray()
    res.json(users);

    client.close()

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
