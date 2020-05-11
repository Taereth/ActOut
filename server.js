// server.js
const express = require('express');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const multiparty = require('multiparty-express');
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
const cookieParser = require('cookie-parser');
const sessionStorage = require('sessionstorage');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config({
  path: './.env'
});
const JWTKEY = fs.readFileSync('./key.key', 'utf8');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(cookieParser());

console.log(process.env);
console.log(process.env.MONGODB_PASS);
//mongoDB Setup

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_PASS;
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

//password hashing
const bcrypt = require('bcryptjs');

//JWT Authentication

function jwtauth(req, res, next){


  var token = req.cookies.sessionToken;

  if(token==null || token == "undefined"){
    res.status(401).send("Token Error");
  }
  try{
    var legit = jwt.verify(token, JWTKEY);
    next();
  }
  catch{
    res.status(401).send("Token Error");
  }

}


//Server Listener

app.get("/test", function (req,res){
  res.json({status: 'testing', 'bibel': 'bobel'});
  console.log("bah");
})


//New User Registration, pushing data to mongoDB
//TODO ERROR if no data sent
app.post("/newuser",function (req,res){

  var rounds = 10;

  bcrypt.hash(req.body.password, rounds, (err,hash)=>{
    if (err) {
      console.log(err);
      return
    }
    req.body.password = hash;

  })

  storeIntoMongoDB(req.body,"users");
  res.status(200).send({ auth: true })
  client.close();


})

//Checking whether Email and Password are in the MongoDB, if they are, returns Email and Password to the Client

app.post("/checklogin",function (req,res){



  console.log(uri);

  var theemail = req.body['email'];

  var theuser = {
    email : theemail
  }



//Functions to run when the user exists in the database

  function iterateFunc(doc) {

    bcrypt.compare(req.body.password,doc.password,(err,response)=>{
      if (err) {
        console.log(err)
        res.status(401).send({error:"Access denied."})
        client.close();
      }
      if(response && req.body.email==doc.email && req.body.password != null && req.body.email != null){

        var payload = {
          "email": doc.email,
          "id": doc.id
        }

        var duration = 30 * 24 * 60 * 60

        var token = jwt.sign(payload, JWTKEY, {
          expiresIn: duration
        })

        res.cookie("sessionToken",token, {maxAge: duration*1000, httpOnly: true});


        delete doc["password"];
        res.status(200).send({auth: true, "user":doc})
        client.close();
      }
      else{
        res.status(401).send({error:"Access denied."})
        client.close();
      }
    })



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

app.post("/getDBEntrybyID",jwtauth,function (req,res){




  var id = req.body['id'].toString();



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
    var collection;

    if(id.startsWith("P")){
      collection = db.collection("projects")
    }
    else{
      collection = db.collection("users");
    }


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

app.post("/getUserEntrybyEmail",jwtauth,function (req,res){




  var email = req.body['email'].toString();



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
    var collection = db.collection("users");


    var cursor = collection.find({"email": email});



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

app.post("/updateDB",jwtauth,function (req,res){

  var dbid = req.body.id;
  var payload = req.body.payload;
  var id= req.body.payload.id;


  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);

    var collection;

    var dbEntry;


    if(id.startsWith("P")){
      collection = db.collection("projects")
      dbEntry = {
        "id":id,
        "creator":payload.creator,
        "name":payload.name,
        "members":payload.members,
        "details":payload.details,
        "pendingmembers":payload.pendingmembers,
        "bannedmembers":payload.bannedmembers,
        "roles":payload.roles,
        "updates":payload.updates
      }
    }
    else{
      collection = db.collection("users");
      dbEntry = {
        "id":id,
        "email":payload.email,
        "vorname":payload.vorname,
        "nachname":payload.nachname,
        "gender":payload.gender,
        "wohnort":payload.wohnort,
        "job":payload.job,
        "friends":payload.friends,
        "projects":payload.projects,
        "updates":payload.updates
      }

    }


    collection.updateOne({_id: new ObjectID(dbid)},{$set:
      dbEntry
    },{upsert: true}, (err, result) =>{
      if (err){
        throw err;
      }
      client.close();

    })

  })


})

app.get("/allusers", jwtauth, function (req,res){

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

app.post("/userprojects", jwtauth, function (req,res){

  var user = req.body.email;

  var userprojects=[];


  MongoClient.connect(uri, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err;

    const db = client.db(dbName)
    const collection = db.collection("projects")

	var cursor = collection.find({members: { $all: [user] }})

	var userprojects = await cursor.toArray()
    res.json(userprojects);

    client.close();

  })


})

app.post("/allprojects", jwtauth, function (req,res){

  var user = req.body.email;

  var userprojects=[];


  MongoClient.connect(uri, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err;

    const db = client.db(dbName)
    const collection = db.collection("projects")

	var cursor = collection.find()

	var userprojects = await cursor.toArray()
    res.json(userprojects);

    client.close();

  })


})

app.post("/newproject", jwtauth, function (req,res){

    try{
      storeIntoMongoDB(req.body,"projects");
      res.status(200).json("Succesful Insertion");
    }
    catch{
      res.status(500).send({error: "DB Error"});
    }



})

app.post('/fileupload', multer.single("file"), (req, res) => {

  if(!req.file) {
    console.log("No File Detected");
    res.status(400).send("No File Uploaded");
    return;
  }

  var filename = "U"+Date.now().toString()+path.extname(req.file.originalname);
  console.log(req.file);

  var base64data = new Buffer(req.file.buffer, 'binary');

  uploadtoAWS(base64data,filename);
  res.status(200).json({"ImgName":filename});




});

app.post('/filedownload', jwtauth, (req,res) =>{

  console.log(req.body.filename);

  const params = {
    Bucket: 'pbaactout',
    Key: req.body.filename
  }
  s3.getObject(params, (err, data)=>{
    if(err) console.error(err);
    res.status(200).json(data.Body)
  })

} )

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


    })
    client.close();

  })

}

function uploadtoAWS(payload, fileName) {

  const params = {
    Bucket: 'pbaactout',
    Key: fileName,
    Body: payload
  };
  s3.upload(params, function(s3Err,payload){
    if (s3Err) throw s3Err
    console.log("File uploaded.");
  })


}
