// packages
const express = require('express');
const helmet = require('helmet');
const frameguard = require('frameguard');
const path = require('path');
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');
const multiparty = require('multiparty-express');
const httpsRedirect = require('express-https-redirect');
const referrerPolicy = require('referrer-policy');
const noSniff = require('dont-sniff-mimetype')
const hsts = require('hsts')
const sslRedirect = require('heroku-ssl-redirect');
const csp = require('helmet-csp')



app = express();

//Internet Security Aspects, following Mozilla Guidelines
app.use('/', sslRedirect());
var enforce = require('express-sslify');
app.use(noSniff());
app.use(referrerPolicy({ policy: 'no-referrer' }));
app.use(hsts({
  maxAge: 5184000
}))
app.use(helmet());
app.use(frameguard({ action: 'deny' }));
app.use(csp({
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    imgSrc: ["'self'", "data:"],
    objectSrc: ["'self'"],
    baseUri: ["'self'"],
    scriptSrc: ["'self'"],
    frameAncestors: ["'self'"]
  }
}))



const staticFileMiddleware = express.static(path.join(__dirname + '/dist'))
app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);
var port = process.env.PORT || 5001;

//Additional dependencies

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
//JWT Key
const JWTKEY = fs.readFileSync('./key.key', 'utf8');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024
  }
})

//AWS Setup
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});

app.use(cookieParser());



//mongoDB Setup

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_PASS;
const client = new MongoClient(uri);
const assert = require('assert');
const mongoose = require('mongoose');
const ObjectID = mongodb.ObjectID;

//make requests readable for Server

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));


app.listen(port);
console.log('server started '+ port);

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

//Sends DB Entry back to client, based on id
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

//sends User Entry back to client based on email
app.post("/getUserEntrybyEmail",function (req,res){

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
        res.json(JSON.stringify({status:'No Id Found'}));
        client.close();
      }

      else{
        res.json({status:'DB Error'});
        client.close();
      }
    });


  })

})

//update DB Entry
app.post("/updateDB",function (req,res){

  var payload = req.body.payload;
  var id= req.body.payload.id;


  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);

    var collection;

    var dbEntry;

    //If ID starts with P its a project entry
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
    //Else its a User Entry
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
        "updates":payload.updates,
        "activeChats":payload.activeChats,
        "age":payload.age,
        "augenfarbe":payload.augenfarbe,
        "haarfarbe":payload.haarfarbe,
        "groesse":payload.groesse,
        "sprachen":payload.sprachen,
        "fahrausweis":payload.fahrausweis,
        "website":payload.website,
        "showreel":payload.showreel,
        "agentur":payload.agentur,
        "hobbies":payload.hobbies,
        "specialskills":payload.specialskills,
        "ausbildung":payload.ausbildung,
        "actoutprojects":payload.actoutprojects,
        "theater":payload.theater,
        "film":payload.film,
        "anderes":payload.anderes,
        "description":payload.description
      }

    }


    collection.updateOne({id: id},{$set:
      dbEntry
    },{upsert: true}, (err, result) =>{
      if (err){
        throw err;
      }
      res.status(200);
      client.close();


    })

  })


})

//Update a specific DB Entry by ID
app.post("/updateDBbyID",jwtauth,function (req,res){

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
        "updates":payload.updates,
        "activeChats":payload.activeChats,
        "age":payload.age,
        "augenfarbe":payload.augenfarbe,
        "haarfarbe":payload.haarfarbe,
        "groesse":payload.groesse,
        "sprachen":payload.sprachen,
        "fahrausweis":payload.fahrausweis,
        "website":payload.website,
        "showreel":payload.showreel,
        "agentur":payload.agentur,
        "hobbies":payload.hobbies,
        "specialskills":payload.specialskills,
        "ausbildung":payload.ausbildung,
        "actoutprojects":payload.actoutprojects,
        "theater":payload.theater,
        "film":payload.film,
        "anderes":payload.anderes,
        "description":payload.description
      }

    }


    collection.updateOne({id: id},{$set:
      dbEntry
    },{upsert: true}, (err, result) =>{
      if (err){
        throw err;
      }
      client.close();
      res.status(200);

    })

  })


})

//sends all user data to client
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

//sends all projects that user is member of back to client
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

//sends all projects back to client
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

//sends all user data back to client
app.post("/allusers", jwtauth, function (req,res){

  var user = req.body.email;

  var userlist=[];


  MongoClient.connect(uri, { useNewUrlParser: true }, async (err, client) => {
    if (err) throw err;

    const db = client.db(dbName)
    const collection = db.collection("users")

    var cursor = collection.find()

    var userlist = await cursor.toArray()
    res.json(userlist);

    client.close();

  })


})

//creates a new project in the DB
app.post("/newproject", jwtauth, function (req,res){

  try{
    storeIntoMongoDB(req.body,"projects");
    res.status(200).json(JSON.stringify({status:'Succesful Insertion'}));
  }
  catch{
    res.status(500).send({error: "DB Error"});
  }



})

//sets up new Chat in DB
app.post("/chatSetup",jwtauth, function (req,res){

  var user1 = req.body['user1'].toString();
  var user2 = req.body['user2'].toString();



  function iterateFunc(doc) {


    res.json({"ChatID":doc._id, "messages":doc.messages, "version":doc.version});

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
    var collection = db.collection("chats");


    var cursor = collection.find({"user1": {$in: [user1,user2]},
    "user2": {$in: [user1,user2]}

  });


  cursor.count(function(err, count) {
    if(count == 1) {
      cursor.forEach(iterateFunc,errorFunc);
    }

    else if(count == 0){

      var object = {"user1": user1,
      "user2": user2,
      "messages": [],
      "version": 1
    }

    collection.insertOne(object, (err, result) =>{
      if (err){
        throw err;
      }

      res.json({"ChatID":result.insertedId, "messages":[], "version":1});

    })

    client.close();
  }

  else{
    res.json({status:'DB Error'});
    client.close();
  }
});

})

})
//Regularly run request that updates chat in client
app.post("/chat",jwtauth, function (req,res){


  var id = req.body['id'].toString();
  var versionnr = req.body['version'];
  var messages = req.body['messages'];

  function iterateFunc(doc) {

    res.json({"ChatID":doc._id, "messages":doc.messages, "version":doc.version});

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
    var collection = db.collection("chats");


    var cursor = collection.find({ $and: [{_id: ObjectID(id)},{version: {$gt: versionnr } } ] })

    cursor.count(function(err, count) {
      if(count == 1) {
        cursor.forEach(iterateFunc,errorFunc);
      }

      else if(count == 0){

        res.json({"ChatID":id, "messages":messages, "version": versionnr});


        client.close();
      }

      else{
        res.json({status:'DB Error'});
        client.close();
      }
    });


  })



})

//Update Chat DB Entry
app.post("/updateChatDB",jwtauth,function (req,res){


  var dbid = req.body.id;
  var payload = req.body.payload;
  var version = req.body.version;


  MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
    if (err) {
      throw err;
    }

    const db = client.db(dbName);

    var collection = db.collection("chats")

    var dbEntry = {
      "messages":payload,
      "version":version
    }

    collection.updateOne({_id: ObjectID(dbid)},{$set:
      dbEntry
    },{upsert: true}, (err, result) =>{
      if (err){
        throw err;
      }


    })

    res.status(200).json(JSON.stringify({status:"succesful"}))
    client.close();


  })


})

//Request to Upload File to AWS
app.post('/fileupload', multer.single("file"), (req, res) => {

  if(!req.file) {
    console.log("No File Detected");
    res.status(400).send("No File Uploaded");
    return;
  }

  var filename = "U"+Date.now().toString()+path.extname(req.file.originalname);

  var base64data = new Buffer(req.file.buffer, 'binary');

  uploadtoAWS(base64data,filename);
  res.status(200).json({"ImgName":filename});




});

//Request to Download File from AWS
app.post('/filedownload', jwtauth, (req,res) =>{

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

//Function to Upload a File to AWS
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
