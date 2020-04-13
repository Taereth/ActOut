// server.js
var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();
app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 5001;
app.listen(port);
console.log('server started '+ port);

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
app.use(bodyParser.json());

//test

const dbName = "test";

async function run() {
   try {
        await client.connect();
        console.log("Connected correctly to server");
        const db = client.db(dbName);

        // Use the collection "people"
        const col = db.collection("people");

        col.insertOne({
  item: "canvas",
  qty: 100,
  tags: ["cotton"],
  size: { h: 28, w: 35.5, uom: "cm" }
})

       } catch (err) {
        console.log(err.stack);
    }

    finally {
       await client.close();
       console.log("closed client.");
   }
}

run().catch(console.dir);

//Server Listener

app.get("/test", function (req,res){
  res.send("hallo");
  console.log("bah");
})
