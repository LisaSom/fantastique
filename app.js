const express = require("express");
const app = express();
const {MongoClient} =require('mongodb');

const url = "mongodb://localhost:27017";

const client = new MongoClient(url)

app.listen(8888,() => { console.log('serveur ecoute sur le port 8888') })
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    async function run() {
        try {
    
          await client.connect();
          let cols = await  client.db("fantastique").collection('unicorns').find().toArray()
          res.render('index', {resultat: cols})
        } finally {
            
          await client.close();
        }
    }
    run().catch(console.dir);
});

app.get('/licorne/:id', function (req, res) {
    let name = (req.params.id)
    async function run() {
        try {
    
          await client.connect();
          let cols = await  client.db("fantastique").collection('unicorns').find({name:name}).toArray()
          console.log(cols)
          res.json(cols[0])
        } finally {
            
          await client.close();
        }
    }
    run().catch(console.dir);
})